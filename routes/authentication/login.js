import express from "express";
import crypto from 'crypto';
import jsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

//import schema
import OTP from '../../schema/otp.js';
import Customer from '../../schema/customer.js';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Customer Login with JWT
 *     description: Customers can log in using either phone or email and receive a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "+999543210789"
 *               password:
 *                 type: string
 *                 example: "P@ssword1234"
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Login Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 customer:
 *                   type: object
 *       400:
 *         description: Bad Request (Missing Credentials)
 *       401:
 *         description: Unauthorized (Invalid Credentials)
 */
router.post("/", async (req, res) => {
    try {
      const { phone, email, password } = req.body;
  
      if ((!phone || !email) && !password) {
        return res.status(400).json({ error: "Phone/Email and Password is required for login" });
      }
  
      let user;

      if (phone) {
        user = await Customer.findOne({ phone });
      } else if (email) {
        user = await Customer.findOne({ email });
      }
  
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      if (!(await bcrypt.compare(password, user.hashedPassword))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jsonWebToken.sign({ phone: phone }, 'token',  {expiresIn : '3h'});
      const refToken = jsonWebToken.sign({ phohne: phone}, 'refToken', {expiresIn: '30d'});
      user.token = token;
      user.refToken = refToken;
      user.tokenExpiry =  new Date(Date.now() + 3 * 60 * 60 * 1000);
      user.refTokenExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      await user.save();
      return res.status(200).json({token: token, refToken: refToken});
  
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

/**
 * @swagger
 * /auth/login/send-otp:
 *   post:
 *     summary: Send OTP for Login
 *     requestBody:
 *       description: Add customer mobile number 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+999543210789"
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: OTP Sent Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "OTP Sent Successfully"
 *       400:
 *         description: Bad Request (Phone Required)
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Phone number is required for OTP"
 */
router.post('/send-otp', async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'Mobile number is required' });

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const OTPModel = await OTP();

    await OTPModel.findOneAndUpdate({ phone }, { otp, expiresAt }, { upsert: true });

    //TODO : send OTP via sms
    //sendOTP(phone, otp);

    return res.status(200).json({ message: 'OTP sent successfully', otp: otp});

});


/**
 * @swagger
 * /auth/login/verify-otp:
 *   post:
 *     summary: Verify OTP for Login
 *     requestBody:
 *       description: Add OTP
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               phone:
 *                 type: string
 *                 example: "+999543210789" 
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: OTP Sent Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "OTP Verified Successfully"
 *       400:
 *         description: Bad Request (Phone Required)
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "OTP is required for Verification"
 */
router.post('/verify-otp', async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) return res.status(400).json({ message: 'Mobile number and OTP are required' });

    const OTPModel = await OTP();

    const record = await OTPModel.findOne({ phone });

    if (!record || record.otp !== otp || new Date() > record.expiresAt) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const userModel = await Customer();
    const user = await userModel.findOne({ phone });

    if (user) {
        await OTPModel.deleteOne({ phone });
        const token = jsonWebToken.sign({ phone: phone }, 'token',  {expiresIn : '3h'});
        const refToken = jsonWebToken.sign({ phone: phone}, 'refToken', {expiresIn: '30d'});
        user.token = token;
        user.refToken = refToken;
        user.tokenExpiry =  new Date(Date.now() + 3 * 60 * 60 * 1000);
        user.refTokenExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await user.save();
        return res.status(200).json({token: token, refToken: refToken});
    } else {
        return res.status(404).json({message: 'Customer not found'});
    }

    
});

export default router;



//TODO : Check if jsonWebToken.sign takes argument expiresIn is actually making the token invalid after the specified value or not, also check the syntax
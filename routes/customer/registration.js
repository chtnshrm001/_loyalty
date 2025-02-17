import express from "express";
import jsonWebToken from 'jsonwebtoken';

const router = express.Router();

//import schema
import Customer from '../../schema/customer.js';
import LoyaltyProfile from '../../schema/loyaltyProfile.js';
import { v4 } from "uuid";


/**
 * @swagger
 * /customer/register:
 *   post:
 *     summary: Register Loyalty Customer
 *     requestBody:
 *       description: Add JSON 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "abc@xyz.com"
 *               name:
 *                 type: string
 *                 example: "XYZ" 
 *               phone:
 *                 type: string
 *                 example: "+999543210789"
 *               preferences:
 *                 type: array
 *                 example: ["Apple", "Orange", "Peach"]
 *                 items:
 *                   type: string
 *               dob:
 *                 type: date
 *                 example: dd/mm/yyyy
 *               gender:
 *                 type: string
 *                 example: "female"
 *               countryOfResidence:
 *                 type: string
 *                 example: "UAE"
 *               nationality:
 *                 type: string
 *                 example: "Indian"
 *     tags:
 *       - Customer
 *     responses:
 *       200:
 *         description: Customer Registered Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Customer Registered Successfully"
 *       400:
 *         description: Bad Request (Phone Required)
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Phone number is required for registration"
 *       409:
 *         description: Conflict (Email already linked to another phone)
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Email is already associated with a different phone number"
 */
router.post("/register", async (req, res) => {
  try {
    const { email, name, phone, preferences, dob, gender, countryOfResidence, nationality, } = req.body;

    // 1. Registration should only be done using phone
    if (!phone) {
      return res.status(400).json("Phone number is required for registration");
    }

    // 2. Check if customer already exists by phone number
    const customerModel = await Customer();
    let customer = await customerModel.findOne({ phone });

    if (!customer) {
      // 3. Ensure the provided email isn't already linked to another phone
      if (email) {
        const existingEmail = await customerModel.findOne({ email });
        if (existingEmail) {
          return res.status(409).json("Email is already associated with a different phone number");
        }
      }

      // Create a new customer profile
      customer = new customerModel({ email, name, phone, preferences, dob, gender, countryOfResidence, nationality});

      const token = jsonWebToken.sign({ userId: customer._id }, 'token',  {expiresIn : '3h'});
      const refToken = jsonWebToken.sign({ userId: customer._id}, 'refToken', {expiresIn: '30d'});
      customer.token = token;
      customer.refToken = refToken;
      customer.tokenExpiry =  new Date(Date.now() + 3 * 60 * 60 * 1000);
      customer.refTokenExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      await customer.save();

      const loyaltyModel = await LoyaltyProfile();
      let loyaltyCustomer = await loyaltyModel.findOne({ phone });

      if (!loyaltyCustomer) {
        // Create a new customer profile
        const loyaltyid = v4();
        const tier = "Bronze";
        const cashback = 0;
        const points = 0;
        loyaltyCustomer = new loyaltyModel({ loyaltyid, phone, tier, cashback, points});

        await loyaltyCustomer.save();

      } 

      return res.status(200).json({message: 'Customer Registered Successfully'});
    } else {
      // 4. Allow updating details after registration
      if (email && customer.email !== email) {
        const existingEmail = await Customer.findOne({ email });
        if (existingEmail) {
          return res.status(409).json("Email is already associated with a different phone number");
        }
      }

      await customer.save();
      return res.status(200).json("Customer details updated successfully");
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

export default router;
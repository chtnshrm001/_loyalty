import express from "express";
const router = express.Router();

import Customer from '../../schema/loyaltyProfile.js';
import Transaction from '../../schema/transaction.js';

/**
 * @swagger
 * /cashback/purchase:
 *   post:
 *     summary: registers Earning
 *     requestBody:
 *       description: Add JSON 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+999543210789"
 *               brandName:
 *                 type: string
 *                 example: "SSS"
 *               amount:
 *                 type: number
 *                 example: 1000
 *     tags:
 *       - Extras
 *     responses:
 *       200:
 *         description: Points Added Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Points Added Successfully"
 *       400:
 *         description: Bad Request (Phone Required)
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Phone number is required for registration"
 *       409:
 *         description: Conflicting Transaction
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Conflicting Transaction"
 */
router.post('/', async (req, res) => {
    try {
      const { phone, brandName, amount, type, location } = req.body;

      const userModel = await Customer();
      let user = await userModel.findOne({ phone });

      if (!user) res.status(404).json({ message: 'User not registered for loyalty program!'});

      const points = Math.floor(amount * 0.01); // 1% of the amount
      const customerId = user.loyaltyid;
  
      console.log('hihihih');
      const transactionModel = await Transaction();
      let transaction = await transactionModel({customerId, brandName, amount, points, type, location });
      console.log('hihihih 1');
      await transaction.save();
      console.log('hihihih 2');
      
      user.cashbackBalance = user.cashbackBalance + points;
      user.cashbackEarned = user.cashbackEarned + points;
      console.log('hihihih 2');
      user.transactions.push(transaction._id.toString());
      console.log('hi 2');
      await user.save();
  
      return res.status(200).send({ pointsEarned: points, totalPoints: user.cashbackBalance });
    } catch (err) {
      console.log('hi 3' + err.message);
      return res.status(500).send({ error: err.message });
    }
});

export default router;
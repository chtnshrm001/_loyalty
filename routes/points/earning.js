import express from "express";
const router = express.Router();

import Customer from '../../schema/loyaltyProfile.js';
import Transaction from '../../schema/transaction.js';

/**
 * @swagger
 * /cashback/earn-cashback:
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
 *               location:
 *                 type: string
 *                 example: "Dubai Mall"
 *     tags:
 *       - Cashback
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
      const { phone, brandName, amount, location } = req.body;
      const type = "earn";
      
      const userModel = await Customer();
      let user = await userModel.findOne({ phone });

      if (!user) res.status(404).json({ message: 'User not registered for loyalty program!'});

      const points = Math.floor(amount * 0.01); // 1% of the amount
      const customerId = user.loyaltyid;
  
      const transactionModel = await Transaction();
      let transaction = await transactionModel({customerId, brandName, amount, points, type, location });
      await transaction.save();
      
      user.cashbackBalance = user.cashbackBalance + points;
      user.cashbackEarned = user.cashbackEarned + points;
      user.transactions.push(transaction._id.toString());
      await user.save();
  
      return res.status(200).send({ pointsEarned: points, totalPoints: user.cashbackBalance });
    } catch (err) {
      console.log('hi 3' + err.message);
      return res.status(500).send({ error: err.message });
    }
});

export default router;
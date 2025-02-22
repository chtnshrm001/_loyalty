import express from "express";

const router = express.Router();

//import schema
import LoyaltyProfile from '../../schema/loyaltyProfile.js';

/**
 * @swagger
 * /cashback/balance:
 *   post:
 *     summary: Fetch Point Balance
 *     requestBody:
 *       description: Add JSON 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loyaltyid:
 *                 type: string
 *                 example: "09b16dc8-b4c0-4d56-b06d-a3202a00a4ca"
 *     security:
 *       - BearerAuth: []
 *     description: Fetches point balance
 *     tags:
 *       - Cashback
 *     responses:
 *       200:
 *         description: Balance fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Balance fetched successfully"
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
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.post("/", async (req, res) => {
  try {
    const { loyaltyid, } = req.body;
    const loyaltyModel = await LoyaltyProfile();
    let customer = await loyaltyModel.findOne({ loyaltyid });

    if (!customer) {
      return res.status(404).json("Customer not found!");
    }

    return res.status(200).json({ 
      message : "Points fetched successfully", 
      cashbackBalance: customer.cashbackBalance,
      points: customer.points,
      cashbackEarned: customer.cashbackEarned,
      cashbackRedeemed: customer.cashbackRedeemed,
      cashbackExpired: customer.cashbackExpired
    });
  } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

export default router;
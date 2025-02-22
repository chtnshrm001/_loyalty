import express from "express";

const router = express.Router();

//import schema
import Transaction from '../../schema/transaction.js';

/**
 * @swagger
 * /cashback/transaction-details:
 *   post:
 *     summary: Fetch Transaction Details
 *     requestBody:
 *       description: Add JSON 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transactionid:
 *                 type: string
 *                 example: "67b6454f196caaf2015c766f"
 *     security:
 *       - BearerAuth: []
 *     description: Fetches point balance
 *     tags:
 *       - Cashback
 *     responses:
 *       200:
 *         description: Transaction fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Transaction fetched successfully"
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
    const { transactionid, } = req.body;

    const transactionModel = await Transaction();
    let transaction = await transactionModel.findById(transactionid);

    if (!transaction) {
      return res.status(404).json("Customer not found!");
    }

    return res.status(200).json({ 
      message : "Transaction fetched successfully", 
      transactions: transaction
    });
  } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

export default router;
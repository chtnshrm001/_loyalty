import express from "express";

const router = express.Router();

//import schema
import Middleware from '../../utils/middleware.js';
import LoyaltyProfile from '../../schema/loyaltyProfile.js';
import { v4 } from "uuid";

/**
 * @swagger
 * /loyalty/createProfile:
 *   post:
 *     summary: Store Customer Details
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
 *               tier:
 *                 type: string
 *                 example: "Bronze"
 *               cashback:
 *                 type: number
 *                 example: 0
 *               points:
 *                 type: number
 *                 example: 0 
 *     tags:
 *       - Loyalty
 *     responses:
 *       200:
 *         description: Details stored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Details stored successfully"
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
router.post("/createProfile", async (req, res) => {
  try {
    const { phone, tier, cashback, points, } = req.body;

    // 1. Registration should only be done using phone
    if (!phone) {
      return res.status(400).json("Phone number is required for creation");
    }

    // 2. Check if customer already exists by phone number
    const customerModel = await LoyaltyProfile();
    let customer = await customerModel.findOne({ phone });

    if (!customer) {
      // Create a new customer profile
      const loyaltyid = v4();
      customer = new customerModel({ loyaltyid, phone, tier, cashback, points});

      await customer.save();

      return res.status(200).json("Customer Added Successfully");
    } 
  } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});


/**
 * @swagger
 * /loyalty/getProfile:
 *   get:
 *     summary: Fetch Customer Details
 *     security:
 *       - BearerAuth: []
 *     description: Ends the user's session and invalidates the token.
 *     tags:
 *       - Loyalty
 *     responses:
 *       200:
 *         description: Details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Details fetched successfully"
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
router.get("/getProfile", Middleware.Auth,  async (req, res) => {
  try {
    const user = req.user;
    const phone = user.phone;

    const loyaltyModel = await LoyaltyProfile();
    let customer = await loyaltyModel.findOne({ phone });

    if (!customer) {
      return res.status(404).json("Customer not found!");
    }

    return res.status(200).json({ message : "Customer fetched successfully", customer: JSON.stringify(customer)});
  } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

export default router;
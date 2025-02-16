import express from "express";
const router = express.Router();

import Customer from '../../schema/customer.js';
import Middleware from '../../utils/middleware.js'

/**
 * @swagger
 * /profile/update:
 *   post:
 *     summary: Update Loyalty Customer
 *     security:
 *       - BearerAuth: []
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
 *               preferences:
 *                 type: array
 *                 example: ["Apple", "Orange", "Peach"]
 *                 items:
 *                   type: string
 *               dob:
 *                 type: date
 *                 example: mm/dd/yyyy
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
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.post("/update", Middleware.Auth, async (req, res) => {
  try {
    const user = req.user;
    const phone = user.phone;
    const { email, name, preferences, dob, gender, countryOfResidence, nationality, } = req.body;

    const customerModel = await Customer();
    let customer = await customerModel.findOne({ phone });

    if (!customer) {
        return res.status(404).json("User not found");
    }

    if (!customer.token) {
      return res.status(404).json("Invalid Token");
    }

    if (name) customer.name = name;
    if (email) customer.email = email;
    if (preferences) customer.preferences = preferences;
    if (dob) customer.dob = dob;
    if (gender) customer.gender = gender;
    if (countryOfResidence) customer.countryOfResidence = countryOfResidence;
    if (nationality) customer.nationality = nationality;

    await customer.save();

    return res.status(200).json("Customer details updated successfully");
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

export default router;
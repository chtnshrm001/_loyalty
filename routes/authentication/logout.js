import express from "express";
const router = express.Router();

import Middleware from '../../utils/middleware.js';
import Customer from '../../schema/customer.js';

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logs out customer
 *     security:
 *       - BearerAuth: []
 *     description: Ends the user's session and invalidates the token.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Logout Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout Successful"
 *       400:
 *         description: Bad Request (Token Required)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad Request - Token required"
 *       500:
 *         description: Logout Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout Failed"
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.post('/', Middleware.Auth, async (req, res) => {
    const phone = req.user.phone;

    const customerModel = await Customer();
    const customer = await customerModel.findOne({ phone });

    if (!customer) {
        return res.status(404).json('Customer not found!');
    }
    if (!customer.token) {
        return res.status(404).json('Customer already logged out');
    }

    customer.token = null;
    customer.refToken = null;

    await customer.save();

    if (customer) {
        res.clearCookie('token');
        return res.status(200).json('Customer Logged Out Successfully');
    } else {
        return res.status(400).json('No Customer associated with provided token');
    }

    
});

export default router;
import express from "express";
const router = express.Router();

/**
 * @swagger
 * /support:
 *   get:
 *     summary: Support Ticket
 *     tags:
 *       - Customer Support
 *     responses:
 *       200:
 *         description: Support Ticket Created Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
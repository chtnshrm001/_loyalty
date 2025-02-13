import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Customer Insight:
 *   get:
 *     summary: registers Customer Insight
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Customer Insight Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
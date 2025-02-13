import express from "express";
const router = express.Router();

/**
 * @swagger
 * /transactionhistory:
 *   get:
 *     summary: registers Transactions History
 *     tags:
 *       - Points
 *     responses:
 *       200:
 *         description: Transactions History Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
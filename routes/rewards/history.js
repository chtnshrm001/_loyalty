import express from "express";
const router = express.Router();

/**
 * @swagger
 * /History:
 *   get:
 *     summary: registers History
 *     tags:
 *       - Rewards
 *     responses:
 *       200:
 *         description: History Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
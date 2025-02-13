import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Brand Promo:
 *   get:
 *     summary: registers Brand Promo
 *     tags:
 *       - Rewards
 *     responses:
 *       200:
 *         description: Brand Promo Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
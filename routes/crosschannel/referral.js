import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Referral:
 *   get:
 *     summary: registers Referral
 *     tags:
 *       - Extras
 *     responses:
 *       200:
 *         description: Referral Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
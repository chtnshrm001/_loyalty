import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Tier:
 *   get:
 *     summary: registers Tier
 *     tags:
 *       - Extras
 *     responses:
 *       200:
 *         description: Tier Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
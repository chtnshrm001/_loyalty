import express from "express";
const router = express.Router();

/**
 * @swagger
 * /purchase:
 *   get:
 *     summary: registers purchase
 *     tags:
 *       - Points
 *     responses:
 *       200:
 *         description: Purchase Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
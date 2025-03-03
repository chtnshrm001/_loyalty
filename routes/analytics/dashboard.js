import express from "express";
const router = express.Router();

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: registers Dashboard
 *     tags:
 *       - Extras
 *     responses:
 *       200:
 *         description: Dashboard Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
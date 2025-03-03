import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Preferences:
 *   get:
 *     summary: registers Preferences
 *     tags:
 *       - Extras
 *     responses:
 *       200:
 *         description: Preferences Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
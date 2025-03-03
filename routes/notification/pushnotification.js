import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Push Notification:
 *   get:
 *     summary: registers Push Notification
 *     tags:
 *       - Extras
 *     responses:
 *       200:
 *         description: Push Notification Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
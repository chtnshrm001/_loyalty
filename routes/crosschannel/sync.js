import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Sync:
 *   get:
 *     summary: registers Sync
 *     tags:
 *       - Cross Channel
 *     responses:
 *       200:
 *         description: Sync Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Brand Purchase Track:
 *   get:
 *     summary: registers Brand Purchase Track
 *     tags:
 *       - Extras
 *     responses:
 *       200:
 *         description: Brand Purchase Track Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

export default router;
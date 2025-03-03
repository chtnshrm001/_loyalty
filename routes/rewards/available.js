import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Availability:
 *   get:
 *     summary: registers Availability
 *     tags:
 *       - Extras
 *     responses:
 *       200:
 *         description: Availability Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

router.get('/rewards/available', async (req, res) => {
    try {
      const rewards = await Reward.find({ available: true });
      res.send(rewards);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});

export default router;
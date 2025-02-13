import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Personalized Promo:
 *   get:
 *     summary: registers Personalized Promo
 *     tags:
 *       - Rewards
 *     responses:
 *       200:
 *         description: Personalized Promo Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

router.get('/offers/personalized/:id', async (req, res) => {
    try {
      const offers = await Offer.find();
      res.send(offers); // Extend logic for personalization
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});

export default router;
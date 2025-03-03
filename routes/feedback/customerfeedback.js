import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Customer Feedback:
 *   get:
 *     summary: registers Customer Feedback
 *     tags:
 *       - Extras
 *     responses:
 *       200:
 *         description: Customer Feedback Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

router.post('/feedback', async (req, res) => {
    try {
      const feedback = new Feedback(req.body);
      await feedback.save();
      return res.status(201).send({ message: 'Feedback submitted successfully' });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
});

export default router;
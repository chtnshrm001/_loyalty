import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Earning:
 *   get:
 *     summary: registers Earning
 *     tags:
 *       - Points
 *     responses:
 *       200:
 *         description: Earning Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

router.post('/loyalty/earning', async (req, res) => {
    try {
      const { customerId, brandId, amount } = req.body;
      const points = Math.floor(amount / 10); // Example calculation
  
      const transaction = new Transaction({ customerId, brandId, amount, points });
      await transaction.save();
  
      const customer = await Customer.findById(customerId);
      if (!customer) return res.status(404).send({ error: 'Customer not found' });
  
      customer.points += points;
      customer.transactions.push(transaction._id);
      await customer.save();
  
      return res.status(200).send({ pointsEarned: points, totalPoints: customer.points });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
});

export default router;
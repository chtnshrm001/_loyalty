import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Reedemption:
 *   get:
 *     summary: registers Reedemption
 *     tags:
 *       - Points
 *     responses:
 *       200:
 *         description: Reedemption Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

router.post('/loyalty/redeem', async (req, res) => {
    try {
      const { customerId, rewardId } = req.body;
      const customer = await Customer.findById(customerId);
      const reward = await Reward.findById(rewardId);
  
      if (!customer || !reward) return res.status(404).send({ error: 'Customer or Reward not found' });
      if (customer.points < reward.pointsRequired) return res.status(400).send({ error: 'Insufficient points' });
  
      customer.points -= reward.pointsRequired;
      await customer.save();
  
      return res.status(200).send({ message: 'Reward redeemed successfully', remainingPoints: customer.points });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
});
  

export default router;
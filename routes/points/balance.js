import express from "express";
const router = express.Router();

/**
 * @swagger
 * /Points Balance:
 *   get:
 *     summary: registers Points Balance
 *     tags:
 *       - Points
 *     responses:
 *       200:
 *         description: Points Balance Registered Successfully
 *         content:
 *           application/json:
 */
router.get('/', (req, res) => {
    res.send('Hi router tested');
});

router.get('/loyalty/balance/:id', async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) return res.status(404).send({ error: 'Customer not found' });
      res.send({ points: customer.points });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
});

export default router;
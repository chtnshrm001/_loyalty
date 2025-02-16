import express from "express";
const router = express.Router();

import Config from '../../schema/config.js';

/**
 * @swagger
 * /config/mobile:
 *   get:
 *     summary: Get mobile config
 *     tags:
 *       - Config
 *     responses:
 *       200:
 *         description: Mobile Config Returned Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Mobile Config Returned Successfully"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Config not found"
 */
router.get("/mobile", async (req, res) => {
  try {
    const configModel = await Config();
    let config = await configModel.findOne();

    if (!config) {
        return res.status(404).json("Config not found");
    }

    return res.status(200).json(config);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

export default router;
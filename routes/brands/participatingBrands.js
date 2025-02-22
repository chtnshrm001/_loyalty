import express from "express";
const router = express.Router();

import Brands from '../../schema/brands.js';

/**
 * @swagger
 * /brands/get:
 *   get:
 *     summary: Get Participating Brands
 *     tags:
 *       - Brands
 *     responses:
 *       200:
 *         description: Brands Returned Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Brands Returned Successfully"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Config not found"
 */
router.get("/get", async (req, res) => {
  try {
    const brandsModel = await Brands();
    let brands = await brandsModel.findOne();

    if (!brands) {
        return res.status(404).json("Brands not found");
    }

    return res.status(200).json(brands);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});



/**
 * @swagger
 * /brands/add:
 *   post:
 *     summary: Add Participating Brands
 *     requestBody:
 *       description: Add Brand
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: "SSS"
 *     tags:
 *       - Brands
 *     responses:
 *       200:
 *         description: Brands Added Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Brands Added Successfully"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Brand not found"
 */
router.post("/add", async (req, res) => {
    try {
        const { brandName } = req.body;

        if (!brandName) {
            return res.status(400).json({ error: "Brand name is required" });
        }

        let brandsModel = await Brands();
        let brands = await brandsModel.findOne();

        if (!brands) {
            brands = await brandsModel({ brandName: { [brandName]: 1 } });
            await brands.save();
        } else {
            let existingBrand = brands.brandName.has(brandName);
            if (!existingBrand) {
                brands.brandName.set(brandName, 1);
                await brands.save();
            } else {
                return res.status(200).json({ message: "Brand already partcipating"});
            }
        }

        return res.status(200).json({ message: "Brands Added Successfully"});
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

/**
 * @swagger
 * /brands/remove:
 *   post:
 *     summary: Remove Participating Brands
 *     requestBody:
 *       description: Add Brand
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: "SSS"
 *     tags:
 *       - Brands
 *     responses:
 *       200:
 *         description: Brands Removed Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Brands Removed Successfully"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Brand not found"
 */
router.post("/remove", async (req, res) => {
    try {
        const { brandName } = req.body;

        if (!brandName) {
            return res.status(400).json({ error: "Brand name is required" });
        }

        let brandsModel = await Brands();
        let brands = await brandsModel.findOne();

        if (!brands) {
            return res.status(404).json({ message : "No Brands Found" });
        } else {
            let existingBrand = brands.brandName.has(brandName);
            if (!existingBrand) {
                return res.status(404).json({ message : "Brand Doesn't Exists"});
            } else {
                brands.brandName.set(brandName, 0);
                await brands.save();
                return res.status(200).json({ message: "Brand Removed Successfully"});
            }
        }

        return res.status(200).json({ message: "Brands Added Successfully"});
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

export default router;
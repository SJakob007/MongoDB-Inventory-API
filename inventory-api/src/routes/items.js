// Manages inventory collection by storing items in JavaScript array
// Defines GET, POST, PUT, DELETE that allow user to interact with array
import express from "express";
import { getDatabase } from "../db.js";
import { ObjectId } from "mongodb";

// Creates separate router for the inventory API
const router = express.Router();


// GET: Retrieve all inventory items
router.get("/", async (req, res) =>
{
    try
    {
        const db = getDatabase();

        const items = await db.collection("items").find({}).toArray();

        res.status(200).json({ data: items });
    }
    catch (error)
    {
        res.status(500).json({ error: "Failed to retrieve inventory items." });
    }
});

// GET: Retrieve one inventory item by ID 
router.get("/:id", async (req, res) =>
{
    try
    {
        if (!ObjectId.isValid(req.params.id))
        {
            return res.status(404).json({
                error: "Inventory item not found."
            });
        }

        const db = getDatabase();

        const item = await db.collection("items").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!item)
        {
            return res.status(404).json({
                error: "Inventory item not found."
            });
        }

        res.status(200).json({ data: item });
    }
    catch (error)
    {
        res.status(500).json({ error: "Failed to retrieve inventory item." });
    }
});

// POST: Create a new inventory item
router.post("/", async (req, res) =>
{
    try
    {
        const { name, quantity, category } = req.body;

        if (typeof name !== "string" || name.trim() === "")
        {
            return res.status(400).json({
                error: "Item name is required."
            });
        }

        if (!Number.isInteger(quantity) || quantity < 0)
        {
            return res.status(400).json({
                error: "Quantity must be a non-negative integer."
            });
        }

        if (typeof category !== "string" || category.trim() === "")
        {
            return res.status(400).json({
                error: "Item category is required."
            });
        }

        const newItem = {
            name: name.trim(),
            quantity: quantity,
            category: category.trim()
        };

        const db = getDatabase();

        const result = await db.collection("items").insertOne(newItem);

        const savedItem = await db.collection("items").findOne({
            _id: result.insertedId
        });

        res.status(201).json({ data: savedItem });
    }
    catch (error)
    {
        res.status(500).json({ error: "Failed to create inventory item." });
    }
});

// PUT: Update an existing inventory item
router.put("/:id", async (req, res) =>
{
    try
    {
        if (!ObjectId.isValid(req.params.id))
        {
            return res.status(404).json({
                error: "Inventory item not found."
            });
        }

        const { name, quantity, category } = req.body;

        if (name !== undefined &&
            (typeof name !== "string" || name.trim() === ""))
        {
            return res.status(400).json({
                error: "Item name cannot be blank."
            });
        }

        if (quantity !== undefined &&
            (!Number.isInteger(quantity) || quantity < 0))
        {
            return res.status(400).json({
                error: "Quantity must be a non-negative integer."
            });
        }

        if (category !== undefined &&
            (typeof category !== "string" || category.trim() === ""))
        {
            return res.status(400).json({
                error: "Item category cannot be blank."
            });
        }

        const updates = {};

        if (name !== undefined)
        {
            updates.name = name.trim();
        }

        if (quantity !== undefined)
        {
            updates.quantity = quantity;
        }

        if (category !== undefined)
        {
            updates.category = category.trim();
        }

        if (Object.keys(updates).length === 0)
        {
            return res.status(400).json({
                error: "At least one field must be provided for updating."
            });
        }

        const db = getDatabase();

        const result = await db.collection("items").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updates }
        );

        if (result.matchedCount === 0)
        {
            return res.status(404).json({
                error: "Inventory item not found."
            });
        }

        const updatedItem = await db.collection("items").findOne({
            _id: new ObjectId(req.params.id)
        });

        res.status(200).json({ data: updatedItem });
    }
    catch (error)
    {
        res.status(500).json({ error: "Failed to update inventory item." });
    }
});

// DELETE: Remove an inventory item
router.delete("/:id", async (req, res) =>
{
    try
    {
        if (!ObjectId.isValid(req.params.id))
        {
            return res.status(404).json({
                error: "Inventory item not found."
            });
        }

        const db = getDatabase();

        const result = await db.collection("items").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0)
        {
            return res.status(404).json({
                error: "Inventory item not found."
            });
        }

        res.status(200).json({
            message: "Inventory item deleted successfully."
        });
    }
    catch (error)
    {
        res.status(500).json({ error: "Failed to delete inventory item." });
    }
});

export default router;
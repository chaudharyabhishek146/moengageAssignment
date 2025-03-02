const express = require("express")
const List = require("../models/Lists")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all lists for the current user
router.get("/", auth, async (req, res) => {
  try {
    const lists = await List.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(lists)
  } catch (error) {
    console.error("Get lists error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get a specific list
router.get("/:id", auth, async (req, res) => {
  try {
    const list = await List.findOne({ _id: req.params.id, user: req.user._id })

    if (!list) {
      return res.status(404).json({ message: "List not found" })
    }

    res.json(list)
  } catch (error) {
    console.error("Get list error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create a new list
router.post("/", auth, async (req, res) => {
  try {
    const { name, codes } = req.body

    const list = new List({
      name,
      codes,
      user: req.user._id,
    })

    await list.save()
    res.status(201).json(list)
  } catch (error) {
    console.error("Create list error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update a list
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, codes } = req.body

    const list = await List.findOne({ _id: req.params.id, user: req.user._id })

    if (!list) {
      return res.status(404).json({ message: "List not found" })
    }

    if (name) list.name = name
    if (codes) list.codes = codes

    await list.save()
    res.json(list)
  } catch (error) {
    console.error("Update list error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete a list
router.delete("/:id", auth, async (req, res) => {
  try {
    const list = await List.findOneAndDelete({ _id: req.params.id, user: req.user._id })

    if (!list) {
      return res.status(404).json({ message: "List not found" })
    }

    res.json({ message: "List deleted successfully" })
  } catch (error) {
    console.error("Delete list error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router


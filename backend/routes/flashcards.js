const express = require("express");
const router = express.Router();
const Flashcard = require("../models/Flashcard");
const UserFlashcard = require("../models/UserFlashcard");

// GET /flashcards – Get all flashcards
router.get("/", async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch flashcards" });
  }
});

// GET /flashcards/user/:userId – Get flashcards with user-specific progress
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const flashcards = await Flashcard.find();
    const progress = await UserFlashcard.find({ userId });

    // Map flashcardId => status
    const progressMap = {};
    progress.forEach((item) => {
      progressMap[item.flashcardId.toString()] = item.status;
    });

    // Merge status into flashcards
    const enriched = flashcards.map((card) => ({
      ...card.toObject(),
      status: progressMap[card._id.toString()] || "new",
    }));

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user-specific flashcards" });
  }
});

// POST /flashcards/progress – Update flashcard status for a user
router.post("/progress", async (req, res) => {
  try {
    const { userId, flashcardId, status } = req.body;

    await UserFlashcard.updateOne(
      { userId, flashcardId },
      { $set: { status, updatedAt: new Date() } },
      { upsert: true }
    );

    res.json({ message: "Progress updated!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update progress" });
  }
});

module.exports = router;

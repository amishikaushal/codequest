const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');
const User = require('../models/user'); 

// GET all challenges
router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.find({});
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: 'Server Error: Failed to fetch challenges' });
  }
});

// GET challenges by difficulty (case-insensitive)
router.get('/difficulty/:difficulty', async (req, res) => {
  const { difficulty } = req.params;
  const allowedDifficulties = ['easy', 'medium', 'hard'];

  if (!allowedDifficulties.includes(difficulty.toLowerCase())) {
    return res.status(400).json({ message: 'Invalid difficulty level' });
  }

  try {
    const challenges = await Challenge.find({
      difficulty: new RegExp(`^${difficulty}$`, 'i'),
    });
    res.json(challenges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id/completion', async (req, res) => {
  const challengeId = req.params.id;
  const { completed } = req.body;

  try {
    const updatedChallenge = await Challenge.findByIdAndUpdate(
      challengeId,
      { completed },
      { new: true }
    );

    if (!updatedChallenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    res.json(updatedChallenge);
  } catch (error) {
    console.error('Update failed:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET challenges by contest name
router.get('/contest/:name', async (req, res) => {
  const contestName = decodeURIComponent(req.params.name);

  try {
    const challenges = await Challenge.find({ contest: contestName });
    if (challenges.length === 0) {
      return res.status(404).json({ message: 'No challenges found for this contest.' });
    }

    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching contest questions' });
  }
});

// GET random daily challenge
router.get('/daily', async (req, res) => {
  try {
    // Get total count of challenges
    const count = await Challenge.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: 'No challenges available' });
    }

    // Get today's date as a seed for consistent daily challenge
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    
    // Use the date string to generate a consistent index for today
    const seed = dateString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = seed % count;

    // Fetch the challenge at that index
    const challenge = await Challenge.findOne().skip(index);
    
    if (!challenge) {
      return res.status(404).json({ message: 'Failed to get daily challenge' });
    }

    res.json(challenge);
  } catch (err) {
    console.error('Error in daily challenge route:', err);
    res.status(500).json({ message: 'Server error fetching daily challenge' });
  }
});

module.exports = router;

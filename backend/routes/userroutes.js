const express = require('express');
const router = express.Router();
const User = require('../models/user');

const Question = require('../models/Challenge');



router.post('/solve', async (req, res) => {
  const { email, questionId, value } = req.body;

  try {
    const user = await User.findOne({ email });
    const question = await Question.findById(questionId);

    if (!user || !question) return res.status(404).json({ error: "User or question not found" });

    if (!user.progress) {
      user.progress = {
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
      };
    }

    const alreadySolved = user.solvedQuestions.some(qId => qId.toString() === questionId);
    const level = question.difficulty?.toLowerCase();

    const solvedValue = (value === true || value === 'true');

    console.log('User progress before update:', user.progress);
    console.log('Already solved:', alreadySolved);
    console.log('Value:', solvedValue);
    console.log('Question difficulty:', level);

    if (solvedValue && !alreadySolved) {
      user.solvedQuestions.push(questionId);
      user.progress.totalSolved++;
      if (level === 'easy') user.progress.easySolved++;
      else if (level === 'medium') user.progress.mediumSolved++;
      else if (level === 'hard') user.progress.hardSolved++;
    } else if (!solvedValue && alreadySolved) {
      user.solvedQuestions = user.solvedQuestions.filter(qId => qId !== questionId);
      user.progress.totalSolved = Math.max(0, user.progress.totalSolved - 1);
      if (level === 'easy') user.progress.easySolved = Math.max(0, user.progress.easySolved - 1);
      else if (level === 'medium') user.progress.mediumSolved = Math.max(0, user.progress.mediumSolved - 1);
      else if (level === 'hard') user.progress.hardSolved = Math.max(0, user.progress.hardSolved - 1);
    }

    user.markModified('progress');
    user.markModified('solvedQuestions');

    await user.save();

    res.status(200).json({ message: "Progress updated", solvedQuestions: user.solvedQuestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



router.get('/progress/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });


    return res.status(200).json({
      solvedQuestions: user.solvedQuestions || [],
      progress: user.progress || { easySolved: 0, mediumSolved: 0, hardSolved: 0 },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
module.exports = router;

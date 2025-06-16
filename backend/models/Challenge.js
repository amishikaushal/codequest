const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  contest: {
    type: String,
  },
  input_format: {
    type: String,
  },
  output_format: {
    type: String,
  },
  sample_input: {
    type: String,
  },
  sample_output: {
    type: String,
  },
  solution_code: {
    type: String,
  },
  tags: [String],
  isDailyChallenge: {
    type: Boolean,
    default: false
  },
  dailyChallengeDate: {
    type: Date
  }
});

challengeSchema.index({ isDailyChallenge: 1, dailyChallengeDate: 1 });

module.exports = mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema);

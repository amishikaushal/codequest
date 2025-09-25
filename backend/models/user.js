
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  solvedQuestions: {
    type: [String], 
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  totalSubmissions: {
    type: Number,
    default: 0,
  },
  activeDays: {
    type: Number,
    default: 0,
  },
  maxStreak: {
    type: Number,
    default: 0,
  },
  badges: {
    type: [String],
    default: [],
  },
  recentProblems: {
    type: [String],
    default: [],
  },
  progress: {
    totalSolved: { type: Number, default: 0 },
    easySolved: { type: Number, default: 0 },
    mediumSolved: { type: Number, default: 0 },
    hardSolved: { type: Number, default: 0 },
  }
});

module.exports = mongoose.model('User', userSchema);

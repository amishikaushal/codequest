const mongoose = require('mongoose');

const userFlashcardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  flashcardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flashcard',
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'learned', 'repeat'],
    default: 'new',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userFlashcardSchema.index({ userId: 1, flashcardId: 1 }, { unique: true });

module.exports = mongoose.model('UserFlashcard', userFlashcardSchema);

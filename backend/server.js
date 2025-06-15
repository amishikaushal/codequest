// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const challengeRoutes = require('./routes/challengeRoutes.js');
const userroutes = require('./routes/userroutes.js'); 
const flashcardsRoutes = require("./routes/flashcards");

// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "codequest" 
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/challenges', challengeRoutes);
app.use('/api/users', userroutes); 
app.use("/flashcards", flashcardsRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('🚀 CodeQuest Backend is Running!');
});

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});

const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = 3000;

// Body parser middleware (JSON parse karne ke liye)
app.use(express.json());

// Global custom logger middleware
app.use(logger);

// Mount student routes on /students
app.use('/students', studentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
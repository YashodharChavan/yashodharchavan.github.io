const express = require('express');
const path = require('path');
const app = express();

// Serve frontend
app.use(express.static(path.join(__dirname, 'client', 'build')));

// API route example
app.get('/api/data', (req, res) => {
  res.json({ msg: 'Hello from backend' });
});

// Fallback to React index.html for any unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

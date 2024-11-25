// backend/index.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://mongo:27017/mern-db', { useNewUrlParser: true, useUnifiedTopology: 
true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello from the MERN Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


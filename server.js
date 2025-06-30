const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const Game = require('./Game');

app.post('/api/games', async (req, res) => {
  const newGame = new Game(req.body);
  const saved = await newGame.save();
  res.json(saved);
});

app.get('/api/games', async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

app.delete('/api/games/:id', async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});


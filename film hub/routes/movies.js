const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.post('/movies/upload', auth, upload.fields([
  { name: 'video' },
  { name: 'thumbnail' }
]), async (req, res) => {
  if (!req.user.isAdmin) return res.sendStatus(403);
  const { title, description } = req.body;
  const videoPath = req.files.video[0].path;
  const thumbPath = req.files.thumbnail[0].path;
  const movie = new Movie({ title, description, videoPath, thumbPath });
  await movie.save();
  res.json({ msg: 'Uploaded' });
});

module.exports = router;

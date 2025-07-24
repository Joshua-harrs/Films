require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', authRoutes);
app.use('/api', movieRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

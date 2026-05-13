const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const roleMiddleware = require('./middleware/roleMiddleware');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/tasks', require('./routes/taskRoutes'));

app.use('/api/projects', require('./routes/projectRoutes'));

const authMiddleware = require('./middleware/authMiddleware');

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'Protected route accessed',
    user: req.user,
  });
});


app.get(
  '/api/admin',
  authMiddleware,
  roleMiddleware('admin'),
  (req, res) => {

    res.json({
      message: 'Welcome Admin',
    });

  }
);

app.get('/', (req, res) => {
  res.send('Server Running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


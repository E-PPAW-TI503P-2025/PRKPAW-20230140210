const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Home Page for API - Server berjalan lancar!');
});

const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

app.use((req, res) => {
  res.status(404).json({ message: '404 Not Found' });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

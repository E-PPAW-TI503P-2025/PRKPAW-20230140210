const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server berjalan dengan baik!');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Node.js Server!' });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

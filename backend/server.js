// server.js
const express = require('express');
const bodyParser = require('body-parser');
const personRoutes = require('./src/routes/personRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', personRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

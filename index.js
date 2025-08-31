const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'welcome.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});

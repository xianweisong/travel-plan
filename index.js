const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'root')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'root', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`服务器正在监听端口 ${port}`);
});

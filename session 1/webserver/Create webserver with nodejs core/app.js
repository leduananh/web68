//Gọi thư viện http để sử dụng
const http = require('http');

const port = 8080

const hostname= "localhost"

//Khai báo web server
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello MindX Web63 (GET)\n');
  }
  // Xử lý yêu cầu POST
  else if (req.method === 'POST') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello MindX Web63 (POST)\n');
  }
  // Xử lý các phương thức yêu cầu khác
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found\n');
  }
});

//Chạy ứng dụng
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

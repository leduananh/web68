
const http = require('http'); 
const fs = require("fs")

const server = http.createServer((req, res) =>{

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

    if (req.method === 'GET' && req.url === "/plainText") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('<h1>plain text content format</h1>');
    }

    if (req.method === 'GET' && req.url === "/hello.html") {
        const htmlPageContent = fs.readFileSync("./hello.html")
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(htmlPageContent);
    }

    if (req.method === 'GET' && req.url === "/style.css") {
        const style = fs.readFileSync("./style.css")
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(style);
    }

    if (req.method === 'GET' && req.url === "./image.jpg") {
        const jpgImage = fs.readFileSync("./image.jpg")
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpg');
        res.end(jpgImage);
    }

    if (req.method === 'GET' && req.url === "/data.json") {
        const data = require('./data.json')
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
    }

})



const port = 8080

const hostname= "localhost"

//Chạy ứng dụng - run time
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
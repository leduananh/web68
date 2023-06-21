const express = require('express');
const app = express();

// Tạo middleware function logger
const loggerMiddleWare = (req, res, next) => {
    console.log(`[${new Date()}] ${req.method} ${req.url}`);
    // Gọi hàm next() để chuyển tiếp yêu cầu tới middleware tiếp theo
    next();
}

// Tạo middleware function
const GetMiddleware = (req, res) => {
    res.send("Hi")
    // Nếu không Gọi hàm next() thì sẽ không đi tới middleware tiếp theo 
    // và kết thúc middleware stack ở đây
}

// Đăng ký middleware function với ứng dụng Express

app.use(loggerMiddleWare);

app.get('/', GetMiddleware);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

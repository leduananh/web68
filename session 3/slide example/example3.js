const express = require('express');
const app = express();

// Tạo middleware function
const logger = levelLog => (req, res, next) => {
    console.log(levelLog)
    console.log(`[${new Date()}] ${req.method} ${req.url}`);

    // Gọi hàm next() để chuyển tiếp yêu cầu tới middleware tiếp theo
    next();
}

// Đăng ký middleware function với ứng dụng Express

// global middleware
app.use(logger("global middleware"));

// route-specific middleware
app.get('/hi', logger("route-specific middleware"));

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

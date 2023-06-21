const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Sử dụng built-in middleware để phân tích 
// các yêu cầu HTTP với định dạng JSON và x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sử dụng built-in middleware express.static()
//  để phục vụ các tệp tĩnh trong thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng third-party middleware để phân tích và xử lý cookie
app.use(cookieParser());

// Sử dụng third-party middleware để xử lý vấn đề bảo mật 
// liên quan đến việc chia sẻ tài nguyên giữa các miền khác nhau
app.use(cors());

// Sử dụng third-party middleware helmet để cải thiện bảo mật
app.use(helmet());

// Route handler để xử lý các yêu cầu HTTP GET tới /api/users
app.get('/api/users', (req, res) => {
  // Code xử lý yêu cầu tại đây
});

// Route handler để xử lý các yêu cầu HTTP POST tới /api/users
app.post('/api/users', (req, res) => {
  // Code xử lý yêu cầu tại đây
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

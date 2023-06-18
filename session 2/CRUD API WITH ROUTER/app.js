const express = require('express');
const app = express();
const userRoutes = require('./router/userRoutes');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

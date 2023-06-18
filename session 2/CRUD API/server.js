const express = require('express');

const app = express();
const PORT = 3000;

// Dữ liệu mẫu
let users = require("./data.json");

// Middleware để phân tích nội dung của request body
app.use(express.json());

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET a user by id
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.json(user);
  }
});

// POST a new user
app.post('/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.json(user);
});

// PUT an existing user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send('User not found');
  } else {
    user.name = req.body.name;
    res.json(user);
  }
});

// DELETE an existing user
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    res.status(404).send('User not found');
  } else {
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json(deletedUser);
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const users = require("../data.json");

exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};


exports.getUserById = (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.status(200).json(user);
};

exports.createUser = (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.status(201).json(user);
};

exports.updateUser = (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found');
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.status(200).json(user);
};

exports.deleteUser = (req, res) => {
  const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).send('User not found');
  }
  users.splice(userIndex, 1);
  res.status(204).send();
};

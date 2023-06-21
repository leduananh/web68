const express = require('express');
const app = express();

// Middleware function 1
function myMiddleware1(req, res, next) {
    console.log('Middleware function 1 called');
    next();
}

// Middleware function 2
function myMiddleware2(req, res, next) {
    console.log('Middleware function 2 called');
    next();
}

// Attach middleware functions to route handler
app.get('/', myMiddleware1, myMiddleware2);

// Route handler
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

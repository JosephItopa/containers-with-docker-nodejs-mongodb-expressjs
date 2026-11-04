// Import core modules
const express = require('express');
const path = require('path');

// Initialize the application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, Images) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// (Optional) Configure Template Engine - e.g., EJS
// Uncomment the lines below if you install ejs: npm install ejs
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// Root Route
app.get('/', (req, res) => {
    // If using a template engine: res.render('index', { title: 'Home' });
    res.json({ message: 'Welcome to your Node.js application!' });
});

// Sample API Route
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// 404 Error Handler (Catch-all for unhandled routes)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Resource Not Found' });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running smoothly at http://localhost:${PORT}`);
});

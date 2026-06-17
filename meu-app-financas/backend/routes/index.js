const express = require('express');
const router = express.Router();

// Define your API routes here

// Example route
router.get('/example', (req, res) => {
    res.send('This is an example route');
});

// Export the router
module.exports = router;
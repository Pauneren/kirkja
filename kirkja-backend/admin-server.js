const express = require('express');
const path = require('path');

const app = express();
const PORT = 7001;

// Serve static files
app.use(express.static(__dirname));

// Serve admin.html as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Kirkja Admin Frontend running on http://localhost:${PORT}`);
    console.log(`Backend API running on http://localhost:3002`);
});

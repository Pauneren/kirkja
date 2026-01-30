const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:7001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://127.0.0.1:7001', 'https://pauneren.github.io'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Kirkja Backend API',
        version: '1.0.0',
        endpoints: {
            services: '/api/services',
            events: '/api/events',
            news: '/api/news'
        }
    });
});

// API info route
app.get('/api', (req, res) => {
    res.json({
        message: 'Kirkja Church Backend API',
        version: '1.0.0',
        availableEndpoints: [
            'GET /api/services - Get all services',
            'POST /api/services - Create new service',
            'PUT /api/services/:id - Update service',
            'DELETE /api/services/:id - Delete service',
            'GET /api/events - Get all events',
            'POST /api/events - Create new event',
            'PUT /api/events/:id - Update event',
            'DELETE /api/events/:id - Delete event',
            'GET /api/news - Get all news',
            'POST /api/news - Create new news',
            'PUT /api/news/:id - Update news',
            'DELETE /api/news/:id - Delete news'
        ]
    });
});

// Data files paths
const SERVICES_FILE = path.join(__dirname, 'data', 'services.json');
const EVENTS_FILE = path.join(__dirname, 'data', 'events.json');
const NEWS_FILE = path.join(__dirname, 'data', 'news.json');

// Helper function to read JSON file
const readJsonFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
};

// Helper function to write JSON file
const writeJsonFile = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// SERVICES ROUTES
app.get('/api/services', async (req, res) => {
    try {
        const services = await readJsonFile(SERVICES_FILE);
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Error reading services' });
    }
});

app.post('/api/services', async (req, res) => {
    try {
        const services = await readJsonFile(SERVICES_FILE);
        const newService = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        services.push(newService);
        await writeJsonFile(SERVICES_FILE, services);
        res.json(newService);
    } catch (error) {
        res.status(500).json({ error: 'Error creating service' });
    }
});

app.put('/api/services/:id', async (req, res) => {
    try {
        const services = await readJsonFile(SERVICES_FILE);
        const index = services.findIndex(s => s.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Service not found' });
        }
        services[index] = { ...services[index], ...req.body };
        await writeJsonFile(SERVICES_FILE, services);
        res.json(services[index]);
    } catch (error) {
        res.status(500).json({ error: 'Error updating service' });
    }
});

app.delete('/api/services/:id', async (req, res) => {
    try {
        const services = await readJsonFile(SERVICES_FILE);
        const index = services.findIndex(s => s.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Service not found' });
        }
        services.splice(index, 1);
        await writeJsonFile(SERVICES_FILE, services);
        res.json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting service' });
    }
});

// EVENTS ROUTES
app.get('/api/events', async (req, res) => {
    try {
        const events = await readJsonFile(EVENTS_FILE);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error reading events' });
    }
});

app.post('/api/events', async (req, res) => {
    try {
        const events = await readJsonFile(EVENTS_FILE);
        const newEvent = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        events.push(newEvent);
        await writeJsonFile(EVENTS_FILE, events);
        res.json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Error creating event' });
    }
});

app.put('/api/events/:id', async (req, res) => {
    try {
        const events = await readJsonFile(EVENTS_FILE);
        const index = events.findIndex(e => e.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Event not found' });
        }
        events[index] = { ...events[index], ...req.body };
        await writeJsonFile(EVENTS_FILE, events);
        res.json(events[index]);
    } catch (error) {
        res.status(500).json({ error: 'Error updating event' });
    }
});

app.delete('/api/events/:id', async (req, res) => {
    try {
        const events = await readJsonFile(EVENTS_FILE);
        const index = events.findIndex(e => e.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Event not found' });
        }
        events.splice(index, 1);
        await writeJsonFile(EVENTS_FILE, events);
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting event' });
    }
});

// NEWS (FRETTIR) ROUTES
app.get('/api/news', async (req, res) => {
    try {
        const news = await readJsonFile(NEWS_FILE);
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Error reading news' });
    }
});

app.post('/api/news', async (req, res) => {
    try {
        const news = await readJsonFile(NEWS_FILE);
        const newNews = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        news.push(newNews);
        await writeJsonFile(NEWS_FILE, news);
        res.json(newNews);
    } catch (error) {
        res.status(500).json({ error: 'Error creating news' });
    }
});

app.put('/api/news/:id', async (req, res) => {
    try {
        const news = await readJsonFile(NEWS_FILE);
        const index = news.findIndex(n => n.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'News not found' });
        }
        news[index] = { ...news[index], ...req.body };
        await writeJsonFile(NEWS_FILE, news);
        res.json(news[index]);
    } catch (error) {
        res.status(500).json({ error: 'Error updating news' });
    }
});

app.delete('/api/news/:id', async (req, res) => {
    try {
        const news = await readJsonFile(NEWS_FILE);
        const index = news.findIndex(n => n.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'News not found' });
        }
        news.splice(index, 1);
        await writeJsonFile(NEWS_FILE, news);
        res.json({ message: 'News deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting news' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Kirkja backend server running on port ${PORT}`);
});

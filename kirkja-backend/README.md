# Kirkja Backend API

Backend API for the Kirkja church website management system.

## Features

- **Services Management**: CRUD operations for church services
- **Events Management**: CRUD operations for church events  
- **News Management**: CRUD operations for church news
- **Admin Interface**: Web interface for managing content
- **CORS Enabled**: Supports frontend-backend communication

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### News
- `GET /api/news` - Get all news
- `POST /api/news` - Create new news
- `PUT /api/news/:id` - Update news
- `DELETE /api/news/:id` - Delete news

## Data Storage

Data is stored in JSON files in the `data/` directory:
- `data/services.json` - Church services
- `data/events.json` - Church events
- `data/news.json` - Church news

## Deployment

This backend is configured for deployment on Heroku:

1. Install Heroku CLI
2. Login to Heroku: `heroku login`
3. Create app: `heroku create your-app-name`
4. Deploy: `git push heroku main`

## Local Development

1. Install dependencies: `npm install`
2. Start server: `npm start`
3. Start admin interface: `node admin-server.js`

## Environment Variables

- `PORT` - Server port (defaults to 3002)

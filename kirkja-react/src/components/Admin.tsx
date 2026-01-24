import React, { useState, useEffect } from 'react';
import './Admin.css';

interface Service {
  id: number;
  church: string;
  date: string;
  type: string;
  pastor: string;
  theme: string;
  createdAt: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  imageUrl?: string;
  createdAt: string;
}

interface News {
  id: number;
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'events' | 'news'>('services');
  const [services, setServices] = useState<Service[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [serviceForm, setServiceForm] = useState({
    church: '',
    date: '',
    type: '',
    pastor: '',
    theme: ''
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    type: '',
    imageUrl: ''
  });

  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });

  // API base URL
  const API_BASE = 'http://localhost:3001/api';

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log('Fetching data from:', API_BASE);
      const [servicesRes, eventsRes, newsRes] = await Promise.all([
        fetch(`${API_BASE}/services`),
        fetch(`${API_BASE}/events`),
        fetch(`${API_BASE}/news`)
      ]);

      console.log('Response status:', servicesRes.status, eventsRes.status, newsRes.status);

      if (!servicesRes.ok || !eventsRes.ok || !newsRes.ok) {
        throw new Error('API response error');
      }

      const servicesData = await servicesRes.json();
      const eventsData = await eventsRes.json();
      const newsData = await newsRes.json();

      console.log('Fetched data:', { servicesData, eventsData, newsData });

      setServices(servicesData);
      setEvents(eventsData);
      setNews(newsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set empty arrays as fallback
      setServices([]);
      setEvents([]);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  // Service handlers
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceForm)
      });
      const newService = await response.json();
      setServices([...services, newService]);
      setServiceForm({ church: '', date: '', type: '', pastor: '', theme: '' });
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleDeleteService = async (id: number) => {
    try {
      await fetch(`${API_BASE}/services/${id}`, { method: 'DELETE' });
      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Event handlers
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventForm)
      });
      const newEvent = await response.json();
      setEvents([...events, newEvent]);
      setEventForm({ title: '', description: '', date: '', location: '', type: '', imageUrl: '' });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await fetch(`${API_BASE}/events/${id}`, { method: 'DELETE' });
      setEvents(events.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // News handlers
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsForm)
      });
      const newNews = await response.json();
      setNews([...news, newNews]);
      setNewsForm({ title: '', content: '', priority: 'medium' });
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  const handleDeleteNews = async (id: number) => {
    try {
      await fetch(`${API_BASE}/news/${id}`, { method: 'DELETE' });
      setNews(news.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  if (loading) return <div className="admin-loading">Hleður...</div>;

  return (
    <div className="admin-container">
      <h1>Kirkja Admin</h1>
      
      {/* Debug info */}
      <div style={{background: '#f0f0f0', padding: '1rem', marginBottom: '1rem', borderRadius: '5px'}}>
        <p><strong>API Base:</strong> {API_BASE}</p>
        <p><strong>Services:</strong> {services.length} items</p>
        <p><strong>Events:</strong> {events.length} items</p>
        <p><strong>News:</strong> {news.length} items</p>
        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'services' ? 'active' : ''}
          onClick={() => setActiveTab('services')}
        >
          Þjónustur
        </button>
        <button 
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          Viðburðir
        </button>
        <button 
          className={activeTab === 'news' ? 'active' : ''}
          onClick={() => setActiveTab('news')}
        >
          Fréttir
        </button>
      </div>

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="admin-tab-content">
          <h2>Þjónustur</h2>
          
          <form onSubmit={handleAddService} className="admin-form">
            <h3>Bæta við þjónustu</h3>
            <div className="form-group">
              <label>Kirkja:</label>
              <select 
                value={serviceForm.church} 
                onChange={(e) => setServiceForm({...serviceForm, church: e.target.value})}
                required
              >
                <option value="">Veldu kirkju</option>
                <option value="Olafskirkja">Olafskirkja</option>
                <option value="Ingjalsholskirkja">Ingjalsholskirkja</option>
              </select>
            </div>
            <div className="form-group">
              <label>Dagsetning:</label>
              <input 
                type="datetime-local" 
                value={serviceForm.date}
                onChange={(e) => setServiceForm({...serviceForm, date: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Tegund:</label>
              <input 
                type="text" 
                value={serviceForm.type}
                onChange={(e) => setServiceForm({...serviceForm, type: e.target.value})}
                placeholder="T.d. SunnudagsmessA"
                required
              />
            </div>
            <div className="form-group">
              <label>Prestur:</label>
              <input 
                type="text" 
                value={serviceForm.pastor}
                onChange={(e) => setServiceForm({...serviceForm, pastor: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Þema:</label>
              <input 
                type="text" 
                value={serviceForm.theme}
                onChange={(e) => setServiceForm({...serviceForm, theme: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="admin-btn">Bæta við</button>
          </form>

          <div className="admin-list">
            <h3>Núverandi þjónustur</h3>
            {services.map(service => (
              <div key={service.id} className="admin-item">
                <div>
                  <strong>{service.church}</strong> - {new Date(service.date).toLocaleDateString('is-IS')}
                  <br />
                  {service.type} - {service.pastor}
                  <br />
                  <em>{service.theme}</em>
                </div>
                <button 
                  onClick={() => handleDeleteService(service.id)}
                  className="admin-btn delete"
                >
                  Eyða
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="admin-tab-content">
          <h2>Viðburðir</h2>
          
          <form onSubmit={handleAddEvent} className="admin-form">
            <h3>Bæta við viðburði</h3>
            <div className="form-group">
              <label>Titill:</label>
              <input 
                type="text" 
                value={eventForm.title}
                onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Lýsing:</label>
              <textarea 
                value={eventForm.description}
                onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Dagsetning:</label>
              <input 
                type="datetime-local" 
                value={eventForm.date}
                onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Staðsetning:</label>
              <input 
                type="text" 
                value={eventForm.location}
                onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Tegund:</label>
              <input 
                type="text" 
                value={eventForm.type}
                onChange={(e) => setEventForm({...eventForm, type: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Mynd URL (valfrjáls):</label>
              <input 
                type="text" 
                value={eventForm.imageUrl}
                onChange={(e) => setEventForm({...eventForm, imageUrl: e.target.value})}
                placeholder="/images/mynd.jpg"
              />
            </div>
            <button type="submit" className="admin-btn">Bæta við</button>
          </form>

          <div className="admin-list">
            <h3>Núverandi viðburðir</h3>
            {events.map(event => (
              <div key={event.id} className="admin-item">
                <div>
                  <strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString('is-IS')}
                  <br />
                  {event.location} - {event.type}
                  <br />
                  <em>{event.description}</em>
                </div>
                <button 
                  onClick={() => handleDeleteEvent(event.id)}
                  className="admin-btn delete"
                >
                  Eyða
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* News Tab */}
      {activeTab === 'news' && (
        <div className="admin-tab-content">
          <h2>Fréttir</h2>
          
          <form onSubmit={handleAddNews} className="admin-form">
            <h3>Bæta við frétt</h3>
            <div className="form-group">
              <label>Titill:</label>
              <input 
                type="text" 
                value={newsForm.title}
                onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Innihald:</label>
              <textarea 
                value={newsForm.content}
                onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Forgangur:</label>
              <select 
                value={newsForm.priority} 
                onChange={(e) => setNewsForm({...newsForm, priority: e.target.value as 'high' | 'medium' | 'low'})}
              >
                <option value="high">Mikilvægt</option>
                <option value="medium">Almennt</option>
                <option value="low">Lítið</option>
              </select>
            </div>
            <button type="submit" className="admin-btn">Bæta við</button>
          </form>

          <div className="admin-list">
            <h3>Núverandi fréttir</h3>
            {news.map(newsItem => (
              <div key={newsItem.id} className="admin-item">
                <div>
                  <strong>{newsItem.title}</strong> - {newsItem.priority}
                  <br />
                  <em>{newsItem.content}</em>
                </div>
                <button 
                  onClick={() => handleDeleteNews(newsItem.id)}
                  className="admin-btn delete"
                >
                  Eyða
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

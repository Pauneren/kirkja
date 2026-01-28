import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserAnalytics } from '../hooks/useUserAnalytics';
import { useDynamicContent } from '../hooks/useDynamicContent';
import IntelligentRecommendations from './IntelligentRecommendations';
import './Homepage.css';

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

const Homepage: React.FC = () => {
  const location = useLocation();
  const { trackPageView, trackClick, trackScrollDepth } = useUserAnalytics();
  const { getPersonalizedContent } = useDynamicContent();
  
  // Backend data states
  const [services, setServices] = useState<Service[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  
  // API base URL
  const API_BASE = 'http://localhost:3001/api';
  
  // Fetch data from backend
  const fetchBackendData = async () => {
    try {
      const [servicesRes, eventsRes, newsRes] = await Promise.all([
        fetch(`${API_BASE}/services`),
        fetch(`${API_BASE}/events`),
        fetch(`${API_BASE}/news`)
      ]);
      
      if (servicesRes.ok && eventsRes.ok && newsRes.ok) {
        const servicesData = await servicesRes.json();
        const eventsData = await eventsRes.json();
        const newsData = await newsRes.json();
        
        setServices(servicesData);
        setEvents(eventsData);
        setNews(newsData);
      }
    } catch (error) {
      console.error('Error fetching backend data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Track page view
    trackPageView(location.pathname);
    
    // Track scroll depth
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollDepth = Math.round((scrollPosition / scrollHeight) * 100);
      trackScrollDepth(scrollDepth);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Fetch backend data
    fetchBackendData();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);
  
  const handleLinkClick = (element: string) => {
    trackClick(element);
  };
  
  const personalizedContent = getPersonalizedContent({
    favoritePages: [],
    visitFrequency: {},
    lastVisit: Date.now(),
    totalVisits: 0
  });
  
  return (
    <main className="homepage">
    
    <section className="churches">
    <h3>Sóknir</h3>
    <div className="church-grid">
    <div className="church-card">
    <img src={`${process.env.PUBLIC_URL}/images/olafsvikurkirkja.jpg`} alt="Olafskirkja" className="church-image" />
    <h4>Olafskirkja</h4>
    <p>Ólafsvík</p>
    <Link to="/olafskirkja" onClick={() => handleLinkClick('olafskirkja-card')}>Nánar um sókn</Link>
    </div>
    
    <div className="church-card">
    <img src={`${process.env.PUBLIC_URL}/images/ingjaldsholkirkja.jpg`} alt="Ingjalsholskirkja" className="church-image" />
    <h4>Ingjalsholskirkja</h4>
    <p>Ingjalshöll</p>
    <Link to="/ingjalsholskirkja" onClick={() => handleLinkClick('ingjalsholskirkja-card')}>Nánar um sókn</Link>
    </div>
    </div>
    </section>
    <section className="hero">
    <h2>Helgihald á sunnudögum</h2>
    <p>Í Olafskirkju og Ingjalsholskirkju</p>
    </section>
    {/* Dynamic Announcements */}
    <section className="dynamic-announcements">
    <h3>Fréttir og tilkynningar</h3>
    <div className="announcements-grid">
    {loading ? (
      <div className="announcement-card">
      <span className="priority medium">Almennt</span>
      <h4>Hleður fréttum...</h4>
      <p>Sæki gögn frá bakenda...</p>
      </div>
    ) : news.length > 0 ? (
      news.slice(0, 3).map((newsItem) => (
        <div key={newsItem.id} className="announcement-card">
        <span className={`priority ${newsItem.priority}`}>
        {newsItem.priority === 'high' ? 'Mikilvægt' : newsItem.priority === 'medium' ? 'Almennt' : 'Lítið'}
        </span>
        <h4>{newsItem.title}</h4>
        <p>{newsItem.content}</p>
        </div>
      ))
    ) : (
      <div className="announcement-card">
      <span className="priority medium">Almennt</span>
      <h4>Engar fréttir</h4>
      <p>Engar fréttir eða tilkynningar eru tiltækar</p>
      </div>
    )}
    </div>
    </section>
    
    <section className="upcoming-services">
    <h3>Næstu þjónustur</h3>
    <div className="service-schedule">
    {loading ? (
      <div className="service-item">
      <h4>Hleður þjónustum...</h4>
      </div>
    ) : services.length > 0 ? (
      services.slice(0, 5).map((service) => (
        <div key={service.id} className="service-item">
        <h4>{new Date(service.date).toLocaleDateString('is-IS', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</h4>
        <p>{service.church}: {service.type} kl. {new Date(service.date).toLocaleTimeString('is-IS', { hour: '2-digit', minute: '2-digit' })}</p>
        <p>Prestur: {service.pastor}</p>
        {service.theme && <p>Þema: {service.theme}</p>}
        </div>
      ))
    ) : (
      <div className="service-item">
      <h4>Engar þjónustur skráðar</h4>
      </div>
    )}
    </div>
    </section>
    
    {/* Dynamic Events */}
    <section className="dynamic-events">
    <h3>Næstu viðburðir</h3>
    <div className="events-grid">
    {loading ? (
      <div className="event-card">
      <div className="event-content">
      <h4>Hleður viðburðum...</h4>
      </div>
      </div>
    ) : events.length > 0 ? (
      events.slice(0, 3).map((event) => (
        <div key={event.id} className="event-card">
        {event.imageUrl && (
          <img src={event.imageUrl} alt={event.title} className="event-image" />
        )}
        <div className="event-content">
        <h4>{event.title}</h4>
        <p>{event.description}</p>
        <p><strong>Dagsetning:</strong> {new Date(event.date).toLocaleDateString('is-IS', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
        <p><strong>Staðsetning:</strong> {event.location}</p>
        <span className="event-type">{event.type}</span>
        </div>
        </div>
      ))
    ) : (
      <div className="event-card">
      <div className="event-content">
      <h4>Engir viðburðir skráðir</h4>
      </div>
      </div>
    )}
    </div>
    </section>
    
    
    
    <section className="quick-links">
    <h3>Flýtileiðir</h3>
    <div className="links-grid">
    <div className="link-item">
    <h4>Fermingar</h4>
    <p>Upplýsingar um fermingar</p>
    <Link to="/fermingar" onClick={() => handleLinkClick('fermingar-link')}>Nánar</Link>
    </div>
    
    <div className="link-item">
    <h4>Fréttir</h4>
    <p>Nýjustu fréttir og tilkynningar</p>
    <Link to="/frettir" onClick={() => handleLinkClick('frettir-link')}>Nánar</Link>
    </div>
    </div>
    </section>
    
    {/* Intelligent Recommendations */}
    <IntelligentRecommendations />
    </main>
  );
};

export default Homepage;

import React, { useEffect, useState } from 'react';
import './Frettir.css';

interface News {
  id: number;
  title: string;
  content: string;
  church: string;
  priority: 'high' | 'medium' | 'low';
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

const Frettir: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = 'http://localhost:3002/api';

  const fetchData = async () => {
    try {
      const [newsRes, eventsRes] = await Promise.all([
        fetch(`${API_BASE}/news`),
        fetch(`${API_BASE}/events`)
      ]);
      
      if (newsRes.ok && eventsRes.ok) {
        const newsData = await newsRes.json();
        const eventsData = await eventsRes.json();
        
        setNews(newsData.sort((a: News, b: News) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setEvents(eventsData.sort((a: Event, b: Event) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Mikilvægt';
      case 'medium': return 'Almennt';
      case 'low': return 'Lítið';
      default: return 'Almennt';
    }
  };

  const getChurchLabel = (church: string) => {
    switch (church) {
      case 'Olafskirkja': return 'Ólafsvíkurkirkja';
      case 'Ingjalsholskirkja': return 'Ingjalshólskirkja';
      case 'Both': return 'Báðar kirkjur';
      default: return church;
    }
  };

  const getLocationLabel = (location: string) => {
    switch (location) {
      case 'Olafskirkja': return 'Ólafsvíkurkirkja';
      case 'Ingjalsholskirkja': return 'Ingjalshólskirkja';
      case 'Báðar kirkjur': return 'Báðar kirkjur';
      default: return location;
    }
  };

  return (
    <main className="frettir-container">
      <section className="frettir-hero">
        <h2>Fréttir og viðburðir</h2>
        <p>Nýjustu fréttir, tilkynningar og viðburðir frá Ólafsvíkurkirkju og Ingjalshólskirkju</p>
      </section>
      
      <section className="frettir-content">
        {loading ? (
          <div className="loading-state">
            <div className="news-card">
              <h4>Hleður gögnum...</h4>
              <p>Sæki gögn frá bakenda...</p>
            </div>
          </div>
        ) : (
          <>
            {/* News Section */}
            <div className="content-section">
              <h3 className="section-title">Fréttir og tilkynningar</h3>
              {news.length > 0 ? (
                <div className="news-grid">
                  {news.map((newsItem) => (
                    <article key={newsItem.id} className="news-card">
                      <div className="news-header">
                        <span className={`priority ${newsItem.priority}`}>
                          {getPriorityLabel(newsItem.priority)}
                        </span>
                        <span className="church">
                          {getChurchLabel(newsItem.church)}
                        </span>
                      </div>
                      <h3>{newsItem.title}</h3>
                      <p className="news-content">{newsItem.content}</p>
                      <div className="news-footer">
                        <small className="date">
                          {new Date(newsItem.createdAt).toLocaleDateString('is-IS', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </small>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="news-card">
                    <h3>Engar fréttir</h3>
                    <p>Engar fréttir eða tilkynningar eru tiltækar í augnablikinu.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Events Section */}
            <div className="content-section">
              <h3 className="section-title">Viðburðir</h3>
              {events.length > 0 ? (
                <div className="events-grid">
                  {events.map((event) => (
                    <article key={event.id} className="event-card">
                      <div className="event-header">
                        <span className="event-type">{event.type}</span>
                        <span className="event-location">
                          {getLocationLabel(event.location)}
                        </span>
                      </div>
                      <h3>{event.title}</h3>
                      <p className="event-description">{event.description}</p>
                      <div className="event-footer">
                        <small className="event-date">
                          {new Date(event.date).toLocaleDateString('is-IS', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </small>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="event-card">
                    <h3>Engir viðburðir</h3>
                    <p>Engir viðburðir eru skráðir í augnablikinu.</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Frettir;

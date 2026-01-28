import React, { useState } from 'react';
import './ChurchDetail.css';
import olafskirkjaImage from '../images/olafsvikurkirkja.jpg';

const Olafskirkja: React.FC = () => {
  const [isSoknarnefndOpen, setIsSoknarnefndOpen] = useState(false);
  const [isVaramennOpen, setIsVaramennOpen] = useState(false);
  const [isTonlistarstarfOpen, setIsTonlistarstarfOpen] = useState(false);
  
  const toggleSoknarnefnd = () => {
    setIsSoknarnefndOpen(!isSoknarnefndOpen);
  };
  
  const toggleVaramenn = () => {
    setIsVaramennOpen(!isVaramennOpen);
  };
  
  const toggleTonlistarstarf = () => {
    setIsTonlistarstarfOpen(!isTonlistarstarfOpen);
  };
  return (
    <main className="church-detail">
    <section className="church-hero">
    <img src={olafskirkjaImage} alt="Olafskirkja" className="church-hero-image" />
    <div className="church-hero-content">
    <h2>Olafskirkja</h2>
    <p>Ólafsvík</p>
    </div>
    </section>
    
    <section className="info">
    <h2>Staðsetning og Helgihald</h2>
    <p>Heimilisfang: <a href="https://maps.google.com/?q=Kirkjutún+2,+355+Ólafsvík" target="_blank" rel="noopener noreferrer">Kirkjutún 2, 355 Ólafsvík</a></p>
    </section>
    
    <section className="pastor">
    <h2>Prestur</h2>
    <p>Ægir Örn Sveinsson</p>
    <p>Netfang: <a href="mailto:aegirorn@kirkjan.is">aegirorn@kirkjan.is</a></p>
    <p>Sími: 772-1968</p>
    </section>
    
    <section className="ministries">
    <h2>Starfsemi</h2>
    <ul>
    <li className="accordion-item">
    <div className="accordion-header" onClick={toggleTonlistarstarf}>
    Tónlistarstarf
    <span className={`accordion-arrow ${isTonlistarstarfOpen ? 'open' : ''}`}>▼</span>
    </div>
    <ul className={`accordion-content ${isTonlistarstarfOpen ? 'open' : ''}`}>
    <li>Organisti:</li>
    <li>Kirkjuvörður:</li>
    </ul>
    </li>
    </ul>
    </section>
    
    <section className="history">
    <h2>Söguágrip</h2>
    <p>Olafskirkja hefur þjónað samfélaginu í mörg ár. Við erum lifandi trúarsamfélag sem leggur áherslu á guðsþjónustu, samfélagsskap og þjónustu.</p>
    <p>Markmið okkar er að deila Guðs ást í gegnum guðsþjónustu, þjónustu og samfélagsvinnu. Við trúum á að skapa velkomin umhverfi þar sem allir geta vaxið í trúarferli sínum.</p>
    </section>
    
    <section className="board-members">
    <h2 className="accordion-header" onClick={toggleSoknarnefnd}>
    Sóknarnefnd
    <span className={`accordion-arrow ${isSoknarnefndOpen ? 'open' : ''}`}>▼</span>
    </h2>
    <div className={`board-grid ${isSoknarnefndOpen ? 'open' : ''}`}>
    <div className="board-member">
    <div className="member-info">
    <h3>Pétur Bogason</h3>
    <p className="position">Formaður</p>
    </div>
    </div>
    
    <div className="board-member">
    <div className="member-info">
    <h3>Þorsteinn Jakobsson</h3>
    <p className="position">Varaformaður</p>
    </div>
    </div>
    
    <div className="board-member">
    <div className="member-info">
    <h3>Olga Guðrún Gunnarsdóttir</h3>
    <p className="position">Ritari</p>
    </div>
    </div>
    
    <div className="board-member">
    <div className="member-info">
    <h3>Ragnheiður Víglundsdóttir</h3>
    <p className="position">Gjaldkeri</p>
    </div>
    </div>
    </div>
    </section>
    
    <section className="board-members">
    <h2 className="accordion-header" onClick={toggleVaramenn}>
    Varamenn
    <span className={`accordion-arrow ${isVaramennOpen ? 'open' : ''}`}>▼</span>
    </h2>
    <div className={`board-grid ${isVaramennOpen ? 'open' : ''}`}>
    <div className="board-member">
    <div className="member-info">
    <h3>Kristjana Pétursdóttir</h3>
    </div>
    </div>
    </div>
    </section>
    </main>
  );
};

export default Olafskirkja;

import React from 'react';
import SEO from './SEO';
import './ChurchDetail.css';

const Ingjalsholskirkja: React.FC = () => {
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
      <SEO 
        title="Ingjalsholskirkja - Sögufræg kirkja á Hellissandi"
        description="Ingjalsholskirkja er sögufræg kirkja á Hellissandi á Vesturlandi. Upplýsingar um guðþjónustur, fermingar, kirkjuviðburði og sóknarstarf."
        image="https://pauneren.github.io/kirkja/images/ingjaldsholkirkja.jpg"
        url="https://pauneren.github.io/kirkja/ingjalsholskirkja"
        type="place"
      />
    <section className="church-hero">
    <img src={`${process.env.PUBLIC_URL}/images/ingjaldsholkirkja.jpg`} alt="Ingjalsholskirkja" className="church-hero-image" />
    <div className="church-hero-content">
    <h2>Ingjalsholskirkja</h2>
    <p>Ingjalshöll</p>
    </div>
    </section>
    
    <section className="info">
    <h2>Staðsetning og Helgihald</h2>
    <p>Heimilisfang: <a href="https://maps.google.com/?q=Ingjaldshólskirkja+360,+360+Hellissandur" target="_blank" rel="noopener noreferrer">Ingjaldshólskirkja 360, 360 Hellissandur</a></p>
    </section>
    
    <section className="pastor">
    <h2>Prestur</h2>
    <p>Ægir Örn Sveinsson</p>
    <p>Netfang: aegirorn@kirkjan.is</p>
    <p>Sími: (354) 772-1968</p>
    </section>
    
    <section className="ministries">
    <h2>Starfsemi</h2>
    <ul>
    <li>Barnastarf</li>
    <li>Unglingastarf</li>
    <li className="accordion-item">
    <div className="accordion-header" onClick={toggleTonlistarstarf}>
    Tónlistarstarf
    <span className={`accordion-arrow ${isTonlistarstarfOpen ? 'open' : ''}`}>▼</span>
    </div>
    <ul className={`accordion-content ${isTonlistarstarfOpen ? 'open' : ''}`}>
    <li>Organisti: Elena Makeeva</li>
    <li>Kirkjuvörður: Wewlina Wasievicz</li>
    </ul>
    </li>
    </ul>
    </section>
    
    <section className="history">
    <h2>Söguágrip</h2>
    <p>Ingjalsholskirkja hefur þjónað samfélaginu í yfir 75 ár. Byggð 1950, hefur kirkjan vaxið úr litla söfnuði í lifandi trúarsamfélag. Við lögðum nýlegan endurbætingum til að þjóna betur vaxandi meðlimum.</p>
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
    <h3>Hafþór Svanur Svansson</h3>
    <p className="position">Formaður</p>
    </div>
    </div>
    
    <div className="board-member">
    <div className="member-info">
    <h3>Sigrún Fjóla Sigþórsdóttir</h3>
    <p className="position">Varaformaður</p>
    </div>
    </div>
    
    <div className="board-member">
    <div className="member-info">
    <h3>Birna Sigurðardóttir</h3>
    <p className="position">Ritari og safnaðarfulltrúi</p>
    </div>
    </div>
    
    <div className="board-member">
    <div className="member-info">
    <h3>Rebekka Unnarsdóttir</h3>
    <p className="position">Gjaldkeri</p>
    </div>
    </div>
    
    <div className="board-member">
    <div className="member-info">
    <h3>Kristinn Jón Friðþjófsson</h3>
    <p className="position">Meðstjórnandi</p>
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
    <h3>Davíð Óli Axelsson</h3>
    </div>
    </div>
    
    <div className="board-member">
    <div className="member-info">
    <h3>Ari Bent Ómarsson</h3>
    </div>
    </div>
    
    <div className="board-member">
    <div className="member-info">
    <h3>Gunnhildur Kristný Hafsteinsdóttir</h3>
    </div>
    </div>
    
    <div className="board-member">
    <div className="member-info">
    <h3>Hlynur Hafsteinsson</h3>
    </div>
    </div>
    
    <div className="board-member">
    <div className="member-info">
    <h3>Margrét Þorláksdóttir</h3>
    </div>
    </div>
    </div>
    </section>
    </main>
  );
};

export default Ingjalsholskirkja;

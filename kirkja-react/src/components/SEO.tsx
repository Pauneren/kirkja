import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = "Olafskirkja og Ingjalsholskirkja - Kirkjur á Vesturlandi",
  description = "Velkomin í Olafskirkju og Ingjalshólskirkju - tvær sögufrægar kirkjur á Vesturlandi. Upplýsingar um guðþjónustur, fermingar, kirkjuviðburði og sóknarstarf.",
  image = "https://pauneren.github.io/kirkja/images/olafsvikurkirkja.jpg",
  url = "https://pauneren.github.io/kirkja/",
  type = "website"
}) => {
  const fullTitle = title.includes("Olafskirkja og Ingjalsholskirkja") ? title : `${title} | Olafskirkja og Ingjalsholskirkja`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Olafskirkja, Ingjalsholskirkja, Ólafsvikurkirkja, Ólafsvík, Olafsvik, Hellissandur, Ingjalshold, Kirkja, kirkjan, prestur, kirkja, Vesturland, guðþjónusta, fermingar, sókn, kristni, kirkjuviðburðir" />
      <meta name="author" content="Sóknirnefndir Olafskirkju og Ingjalshólskirkju" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Icelandic" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="is_IS" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content={title} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data for specific pages */}
      {url.includes('olafskirkja') && (
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PlaceOfWorship",
          "name": "Olafskirkja",
          "description": "Sögufræg kirkja í Ólafsvík á Vesturlandi",
          "url": "https://pauneren.github.io/kirkja/olafskirkja",
          "image": "https://pauneren.github.io/kirkja/images/olafsvikurkirkja.jpg",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kirkjutún 2",
            "addressLocality": "Ólafsvík",
            "postalCode": "355",
            "addressCountry": "IS"
          },
          "telephone": "+354-772-1968",
          "email": "aegirorn@kirkjan.is",
          "openingHours": "Mo-Su 09:00-17:00",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "64.8944",
            "longitude": "-23.9078"
          }
        })}
        </script>
      )}
      
      {url.includes('ingjalsholskirkja') && (
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PlaceOfWorship",
          "name": "Ingjalsholskirkja",
          "description": "Sögufræg kirkja á Hellissandi á Vesturlandi",
          "url": "https://pauneren.github.io/kirkja/ingjalsholskirkja",
          "image": "https://pauneren.github.io/kirkja/images/ingjaldsholkirkja.jpg",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ingjaldshólskirkja 360",
            "addressLocality": "Hellissandur",
            "postalCode": "360",
            "addressCountry": "IS"
          },
          "telephone": "+354-772-1968",
          "email": "aegirorn@kirkjan.is",
          "openingHours": "Mo-Su 09:00-17:00",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "64.8861",
            "longitude": "-23.9167"
          }
        })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

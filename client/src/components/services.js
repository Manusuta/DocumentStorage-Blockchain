import React from 'react'
import "./styles/ServicesPage.css"
import secure from '../images/secure.png';
import  user from '../images/user.png';
import immutabe from '../images/immutable.png';
import decentralization from '../images/decentre.png';
function services() {
  const services = [
    {
      title: 'Enhanced Security',
      description: 'With blockchain technology, your documents are encrypted and distributed across a decentralized network, making them virtually incorruptible and safeguarded against unauthorized access.',
      image: secure,
    },
    {
      title: 'Immutability',
      
    description: 'Each document uploaded to our platform receives a unique digital signature, ensuring its authenticity and preventing any tampering or alteration.',
    image:immutabe , 
  },
    {
      title: 'Decentralization',
      description: 'Unlike traditional cloud storage, our decentralized approach eliminates the risk of a single point of failure, ensuring uninterrupted access to your files.',
      image:decentralization,
    },
    {
      title: 'User-Friendly Interface',
      description: 'Our intuitive and user-friendly interface allows you to easily upload, organize, and manage your documents with just a few clicks.',
      image:user,
    },
    // Add more service cards as needed
  ];

  return (
    <div className="services-page">
    <h1>Why Choose Our Document Storage Service?</h1>
    <div className="services-container">
      {services.map((service, index) => (
        <div className="service-card" key={index}>
          <img src={service.image} alt={service.title} className="service-image" />
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default services;
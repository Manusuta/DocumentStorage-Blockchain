import React from 'react';
import { Link } from 'react-router-dom';
import './styles/home.css';
import blockchainImage1 from '../images/block1.avif';
import blockchainImage2 from '../images/block2.jpg';
import blockchainImage3 from '../images/block3.png';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Carousel } from 'react-responsive-carousel';
import blockchainImage4 from '../images/block4.webp';
import blockchainImage5 from '../images/block5.webp';
import blockchainImage6 from '../images/block6.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="carousel-container">
        <Carousel autoPlay infiniteLoop interval={3000} showArrows={false} stopOnHover={true}>
          <div className="slide">
            <img src={blockchainImage3} alt="Blockchain 1" />
          </div>
          <div className="slide">
            <img src={blockchainImage2} alt="Blockchain 2" />
          </div>
          <div className="slide">
            <img src={blockchainImage1} alt="Blockchain 3" />
          </div>
        </Carousel>
      </div>
      <header className="header-container">
        <h1>Welcome to Our Blockchain Website</h1>
        <p>Learn about the future of decentralized technology.</p>
        <Link to="https://en.wikipedia.org/wiki/Blockchain" className="explore-link">
          Explore More <AiOutlineArrowRight />
        </Link>
      </header>

      {/* Blockchain Technology Heading */}
      <div className='h'>
      <h1 className="blockchain-heading">BLOCKCHAIN TECHNOLOGY</h1>
      <p className="blockchain-description">
        Blockchain technology is a revolutionary decentralized technology that has the potential to
        disrupt various industries. It is the underlying technology behind cryptocurrencies like
        Bitcoin and offers secure, transparent, and tamper-resistant data storage and transaction
        mechanisms. The blockchain's distributed ledger ensures that transactions are recorded
        immutably, enhancing trust and reducing the need for intermediaries in various processes.
        Find out more about the exciting possibilities of blockchain technology on our website.
      </p>
      </div>
      <div className="card-container">
        {/* Image Card 1 */}
        <div className="card">
          <img src={blockchainImage6} alt="Card 1" className="card-image" />
          <h2>Cryptocurrencies</h2>
          <p>
          Blockchain technology was popularized by the creation of Bitcoin, the first decentralized cryptocurrency. Since then, thousands of cryptocurrencies have emerged, revolutionizing the financial landscape and enabling cross-border transactions.
          </p>
          <a href="https://en.wikipedia.org/wiki/Cryptocurrency"  target="_blank" rel="noopener noreferrer" className="see-more-link">
            See More
          </a>
        </div>

        {/* Image Card 2 */}
        <div className="card">
          <img src={blockchainImage5} alt="Card 2" className="card-image" />
          <h2>Supply Chain Management</h2>
          <p>
          Blockchain can enhance transparency and traceability in supply chains. It allows participants to track the origin, movement, and authenticity of products, reducing fraud and ensuring product provenance.
          </p>
          <a href="https://en.wikipedia.org/wiki/Supply_chain_management" className="see-more-link"  target="_blank" rel="noopener noreferrer">
            See More
          </a>
        </div>

        {/* Image Card 3 */}
        <div className="card">
          <img src={blockchainImage4} alt="Card 3" className="card-image" />
          <h2>Banking and Finance</h2>
          <p>
          Financial institutions are exploring blockchain for faster, more secure, and transparent cross-border transactions and reducing the need for intermediaries.
          </p>
          <a href="https://appinventiv.com/blog/blockchain-in-banking/" className="see-more-link"  target="_blank" rel="noopener noreferrer">
            See More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;

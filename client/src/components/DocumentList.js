import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles/documentList.css'; // Create a CSS file for styling the cards
import pmage from '../images/pdf.png';
import fmage from '../images/folder.jpeg';

const DocumentList = () => {
  const location = useLocation();
  const { documents } = location.state;

  const handleDownload = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Download failed', error);
    }
  };

  const handleShare = async (url, fileName) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: fileName,
          url: url,
        });
        console.log('Document shared successfully');
      } catch (error) {
        console.error('Error sharing document:', error);
      }
    } else {
      alert('Web Share API not supported in this browser');
    }
  };

  return (
    <div className="document-list-container">
      {documents.map((item) => {
        const fileName = item.url ? item.url.split('/').pop() : `Folder${item.id + 1}`;
        return (
          <div key={item.id} className="card1">
            {item.type === 'pdf' && (
              <div>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img src={pmage} alt="PDF Icon" className="icon" />
                </a>
                <button onClick={() => handleDownload(item.url, fileName)} className="download-button">Download</button>
                <button onClick={() => handleShare(item.url, fileName)} className="share-button">Share</button>
              </div>
            )}
            {item.type === 'folder' && (
              <div>
                 <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img src={fmage} alt="Folder Icon" className="folder-icon" />
                </a>
                
                <button onClick={() => handleDownload(item.data, fileName)} className="download-button">Download</button>
                <button onClick={() => handleShare(item.data, fileName)} className="share-button">Share</button>
            
              </div>
            )}
            {item.type === 'image' && (
              <div>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img src={item.url} alt={`Image ${item.id + 1}`} className="image-list" />
                </a>
                <button onClick={() => handleDownload(item.url, fileName)} className="download-button">Download</button>
                <button onClick={() => handleShare(item.url, fileName)} className="share-button">Share</button>
              </div>
            )}
            {item.type === 'url' && (
              <div>
                <a href={item.data} target="_blank" rel="noopener noreferrer">
                  {`URL ${item.id + 1}`}
                </a>
                <button onClick={() => handleDownload(item.data, fileName)} className="download-button">Download</button>
                <button onClick={() => handleShare(item.data, fileName)} className="share-button">Share</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DocumentList;

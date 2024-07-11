import React from 'react';

const MetamaskButton = ({ connectMetamask, disconnectMetamask, connected }) => {
  return (
    <button  className="metamask-button" onClick={connected ? disconnectMetamask : connectMetamask}>
      {connected ? 'Disconnect MetaMask' : 'Connect MetaMask'}
    </button>
  );
};

export default MetamaskButton;

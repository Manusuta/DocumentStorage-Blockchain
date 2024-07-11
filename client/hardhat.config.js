/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
// require('dotenv').config({ path: '/env' });

// require('dotenv').config();
// const privateKey = process.env.PRIVATE_KEY.trim();

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// })

module.exports = {
  solidity:  '0.8.19',
    
    networks:{
      hardhat:{
        chainId:31337,
      },
      // sepolia:{
      //   url:'https://rpc.ankr.com/eth_sepolia',
      //   accounts: [`0x${privateKey}`] 
      //  accounts:[`0x${process.env.PRIVATE_KEY}`]
      // accounts:['26b55ec7a86793b9eb3b159d734f2a39d1254ae0ad8b8ce4876d65b353f658e6']
      
      
    },
  // },
 
    // paths:"\src\artifacts"
    
  };



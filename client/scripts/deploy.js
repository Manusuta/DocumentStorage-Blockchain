const hre = require('hardhat');

async function main() {

    const Lock = await hre.ethers.getContractFactory("Lock")
    const lock = await Lock.deploy();

    await lock.deployed();

    console.log("contract deployed to:", lock.address);
}   

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
        

    });
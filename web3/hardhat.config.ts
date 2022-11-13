import dotenv from 'dotenv';
import '@nomiclabs/hardhat-ethers';
import "@nomiclabs/hardhat-etherscan";

dotenv.config();

//* Notes for deploying the smart contract on your own subnet
//* More info on subnets: https://docs.avax.network/subnets
//* Why deploy on a subnet: https://docs.avax.network/subnets/when-to-use-subnet-vs-c-chain
//* How to deploy on a subnet: https://docs.avax.network/subnets/create-a-local-subnet
//* Transactions on the C-Chain might take 2-10 seconds -> the ones on the subnet will be much faster
//* On C-Chain we're relaying on the Avax token to confirm transactions -> on the subnet we can create our own token
//* You are in complete control over the network and it's inner workings

export default {
  solidity: {
    version: '0.8.17',
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 3225000000000,
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [process.env.PRIVATE_KEY],
    },
    // subnet: {
    //   url: process.env.NODE_URL,
    //   chainId: Number(process.env.CHAIN_ID),
    //   gasPrice: 'auto',
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "W1G7WP6ZER1696K95GPIXJ6N3SX5U7WGY6"
  },
}

//npx hardhat verify <contract address> <arguments> --network <network>
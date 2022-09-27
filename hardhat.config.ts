import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
import '@nomiclabs/hardhat-etherscan';
import './tasks/block-number';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

dotenv.config();

const {
  GOERLI_RPC_URL = 'https://eth-goerli',
  PRIVATE_KEY = '0xkey',
  ETHERSCAN_API_KEY = 'key',
  COINMARKETCAP = 'key',
} = process.env;

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [
        PRIVATE_KEY ||
          'cb91c849c9291d9cced11d4fecf7980432ff4926d4b75d0f6a3ea7af779b3640',
      ],
      chainId: 5,
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      // accounts already placed
      chainId: 31337,
    },
  },
  solidity: '0.8.17',
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP,
  },
};

export default config;

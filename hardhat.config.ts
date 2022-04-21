require('dotenv').config();

import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ganache'; // for testing
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';

// NOTE: Any tasks that depend on the generated typechain makes the build flaky.
//       Favour scripts instead

if (!process.env.ETHERSCAN_API_KEY) {
  console.log(
    "NOTE: environment variable ETHERSCAN_API_KEY isn't set. tasks that interact with etherscan won't work"
  );
}
if (!process.env.INFURA_API_KEY) {
  console.log(
    "NOTE: environment variable INFURA_API_KEY isn't set. Tasks that interact with remote Rinkeby network won't work"
  );
}
if (!process.env.RINKEBY_PRIVATE_KEY) {
  console.log(
    "NOTE: environment variable RINKEBY_PRIVATE_KEY isn't set. Tasks that interact with remote Rinkeby network won't work"
  );
}


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
//
//const INFURA_API_KEY = "24ca35f5760c4f96ba344aeb8af69590";
//const RINKEBY_PRIVATE_KEY = '4c348d95ad4f3c4815041685cbfc8c9a028efde2747a4908ce7ad5aa0c089fea';


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      },
    ],
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`],
    }
  },
  typechain: {
    target: 'ethers-v5',
    outDir: './typechain',
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 120000,
  },
};

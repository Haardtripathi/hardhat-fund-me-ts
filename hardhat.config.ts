import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "@nomiclabs/hardhat-ethers"
import "dotenv/config"
import "solidity-coverage"
import "@nomicfoundation/hardhat-ethers"
import "hardhat-deploy-ethers"
import "hardhat-gas-reporter"

const SEPOLIA_RPC_URL: string | undefined = process.env.SEPOLIA_RPC_URL
const SEPOLIA_PRIVATE_KEY: string | undefined = process.env.SEPOLIA_PRIVATE_KEY

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: SEPOLIA_RPC_URL,
      accounts: SEPOLIA_PRIVATE_KEY !== undefined ? [SEPOLIA_PRIVATE_KEY] : [],
    },
  },
};

export default config;

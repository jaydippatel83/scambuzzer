require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        base: {
            url: process.env.NEXT_PUBLIC_RPC_URL, 
            accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY]
        },
        arbitrum_sepolia: {
            url: process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL,
            accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY],
        },
        flow_testnet: {
            // Flow is not compatible with Hardhat. Use Flow CLI for Flow-specific development.
            url: process.env.NEXT_PUBLIC_FLOW_TESTNET_RPC_URL,
            accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY]
        }
    }
};

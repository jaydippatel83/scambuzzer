"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "../abi/ScamBuzzer";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const chains = {
    base: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_BASE,
    arbitrum: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_ARBITRUM,
    flow: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_FLOW,
}


const SubscriptionContext = createContext();

export const useSubscription = () => {
    return useContext(SubscriptionContext);
};

export const SubscriptionProvider = ({ children }) => {
    const router = useRouter();
    const [account, setAccount] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(false);
    const { authenticated, user } = usePrivy();
    const { wallets, ready } = useWallets();



    // Purchase Subscription NFT
    const purchaseSubscription = async (selectedChain) => {
        setLoading(true);
        try {
            const embeddedWallet = wallets.find((wallet) => wallet.walletClientType == "privy");

            if (embeddedWallet) {
               // 0xF943FA82F901Ead33b091468dF1BdAC66d6B9dD0 embedded wallet
              
                setAccount(embeddedWallet.address); // Set account from user
                try {

                    const privyProvider = await embeddedWallet.getEthereumProvider();
                    const provider = new ethers.providers.Web3Provider(privyProvider);

                    const signer = provider.getSigner();

                   console.log(chains[selectedChain],"chains[selectedChain]")

                    const scamBuzzerContract = await new ethers.Contract(
                        chains[selectedChain],
                        abi,
                        signer
                    );
                    const tx = await scamBuzzerContract.mintNFT("https://lime-passive-orca-378.mypinata.cloud/ipfs/bafybeifqecfjpwe3dwjfpypd5qwnlxw4vg7qvrpbvqtow7ysvg75pjh4si", {
                        value: ethers.utils.parseEther("0.01")
                    });
                    await tx.wait();
                    console.log("Subscription purchased successfully!");
                    checkSubscription(selectedChain);
                    setLoading(false);
                    setContract(scamBuzzerContract);
                } catch (error) {
                    console.error("Wallet connection failed:", error);
                }
            }

        } catch (error) {
            toast.error("Subscription purchase failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkSubscription = async (selectedChain) => {
        try {
            if (embeddedWallet) {
                setAccount(embeddedWallet.address); // Set account from user
                try {

                    const privyProvider = await embeddedWallet.getEthereumProvider();
                    const provider = new ethers.providers.Web3Provider(privyProvider);

                    const signer = provider.getSigner();



                    const scamBuzzerContract = await new ethers.Contract(
                        chains[selectedChain],
                        abi,
                        signer
                    );
                    const balance = await contract.balanceOf(account);
                    if (balance.gt(0)) {
                        setIsActive(true);
                    } else {
                        setIsActive(false);
                    }
                    setContract(scamBuzzerContract);
                } catch (error) {
                    console.error("Wallet connection failed:", error);
                }
            }

        } catch (error) {
            console.error("Subscription purchase failed:", error);
        }
    };


    useEffect(() => {
        if (account && contract) {
            checkSubscription();
        }
    }, [account, contract, ready, authenticated, wallets]);


    return (
        <SubscriptionContext.Provider
            value={{
                account,
                isActive,
                loading,
                purchaseSubscription,

            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};

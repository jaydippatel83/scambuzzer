"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "../abi/ScamBuzzer";
import { usePrivy, useActiveWallet } from "@privy-io/react-auth"; 

const SubscriptionContext = createContext();

export const useSubscription = () => {
    return useContext(SubscriptionContext);
};

export const SubscriptionProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [contract, setContract] = useState(null);
    const { user } = usePrivy();
    const { wallet} = useActiveWallet(); 


    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_BASE;


    // Connect to MetaMask and set the contract
    const connectWallet = async () => {



        console.log(wallet, "wallet")
        if (user) {
            const wallet = user?.linkedAccounts[1]?.address; 
            try {
 
                const provider = await wallet.getEthereumProvider();
                const ethersProvider = new ethers.BrowserProvider(provider);
                const signer = ethersProvider.getSigner();
                const scamBuzzerContract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    abi,
                    signer
                );
                console.log(scamBuzzerContract, "scamBuzzerContract")
                setContract(scamBuzzerContract);
            } catch (error) {

                console.error("Wallet connection failed:", error);
            }
        } else {
            console.error("Wallet not found");
        }
    };

    // Purchase Subscription NFT
    const purchaseSubscription = async () => {
        if (!contract) return;
        try {
            const tx = await contract.purchaseSubscription({
                value: ethers.parseEther("0.01"), // Price as per contract
            });
            await tx.wait();
            console.log("Subscription purchased successfully!");
            checkSubscriptionStatus(); // Update subscription status after purchase
        } catch (error) {
            console.error("Subscription purchase failed:", error);
        }
    };

    // Check if the current user's subscription is active
    const checkSubscriptionStatus = async () => {
        if (!contract || !account) return;
        try {
            const active = await contract.isSubscriptionActive(account);
            setIsActive(active);
        } catch (error) {
            console.error("Failed to check subscription status:", error);
        }
    };

    useEffect(() => {
        connectWallet();
    }, [user]);

    useEffect(() => {
        if (account && contract) {
            checkSubscriptionStatus();
        }
    }, [account, contract]);

    return (
        <SubscriptionContext.Provider
            value={{
                account,
                isActive,
                purchaseSubscription,
                checkSubscriptionStatus,
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};

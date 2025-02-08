"use client"; 
import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "../abi/ScamBuzzer";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

    console.log(user, "user");

    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_BASE;


    const connectWallet = async () => { 
        if (ready && authenticated && wallets.length > 0) {
            const embeddedWallet = wallets.find(wallet => wallet.walletClientType === 'privy');  
            if (embeddedWallet) { 
                try { 
                    const provider = await embeddedWallet.getEthereumProvider();
                    const ethersProvider = new ethers.BrowserProvider(provider);
                    const signer = ethersProvider.getSigner();
                    const scamBuzzerContract = new ethers.Contract(
                        CONTRACT_ADDRESS,
                        abi,
                        signer
                    );  
                    setContract(scamBuzzerContract);
                } catch (error) { 
                    console.error("Wallet connection failed:", error);
                }
            }
            else {
                console.error("Wallet not found");
            }
        } else {
           router.push("/");
        } 
    };

    // Purchase Subscription NFT
    const purchaseSubscription = async () => {
        setLoading(true);
        if (!contract) return;
        try {
            const tx = await contract.purchaseSubscription({
                value: ethers.parseEther("0.01"), // Price as per contract
            });
            await tx.wait();
            toast.success("Subscription purchased successfully!");
            checkSubscriptionStatus();  
        } catch (error) {
            toast.error("Subscription purchase failed:", error);
        } finally {
            setLoading(false);
        }
    };

    // Check if the current user's subscription is active
    const checkSubscriptionStatus = async () => {
        if (!contract || !account) return;
        setLoading(true);
        try {
            const active = await contract.isSubscriptionActive(account);
            setIsActive(active);
        } catch (error) {
            toast.error("Failed to check subscription status:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        connectWallet();
    }, [user, ready, authenticated, wallets]);

    useEffect(() => {
        if (account && contract) {
            checkSubscriptionStatus();
        }
    }, [account, contract, ready, authenticated, wallets]);

    return (
        <SubscriptionContext.Provider
            value={{
                account,
                isActive,
                loading,
                purchaseSubscription,
                checkSubscriptionStatus,
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};

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


    const connectWallet = async () => {
        if (wallets.length > 0) {

            const embeddedWallet = wallets.find((wallet) => wallet.walletClientType == "privy");

            if (embeddedWallet) {
                setAccount(embeddedWallet.address); // Set account from user
                try {

                    const privyProvider = await embeddedWallet.getEthereumProvider();
                    const provider = new ethers.providers.Web3Provider(privyProvider);

                    const signer = provider.getSigner();



                    const scamBuzzerContract = await new ethers.Contract(
                        process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_BASE,
                        abi,
                        signer
                    );
                    setContract(scamBuzzerContract);
                } catch (error) {
                    console.error("Wallet connection failed:", error);
                }
            }
        }
    };

    // Purchase Subscription NFT
    const purchaseSubscription = async () => {
        setLoading(true);
        if (!contract) return;
        try {
            const tx = await contract.mintNFT("https://lime-passive-orca-378.mypinata.cloud/ipfs/bafybeifqecfjpwe3dwjfpypd5qwnlxw4vg7qvrpbvqtow7ysvg75pjh4si", {
                value: ethers.utils.parseEther("0.01")
            });
            await tx.wait();
            console.log("Subscription purchased successfully!");
            checkSubscription();
        } catch (error) {
            toast.error("Subscription purchase failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkSubscription = async () => {
        if (!contract) return;
        try {
            const balance = await contract.balanceOf(account);
            if (balance.gt(0)) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        } catch (error) {
            console.error("Subscription purchase failed:", error);
        }
    };


    useEffect(() => {
        connectWallet();
    }, [user, wallets, ready]);

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

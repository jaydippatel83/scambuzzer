'use client'
import React, { useState } from 'react'; 
import toast from 'react-hot-toast';
import { useSubscription } from '../../context/subscription';

const InactiveSubs = () => {  
    const { purchaseSubscription, checkSubscriptionStatus, loading } = useSubscription();
    const [selectedChain, setSelectedChain] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePayment = async () => { 
        if (!selectedChain || !paymentMethod) {
            toast.error('Please select a chain and payment method.');
            return;
        }
        await purchaseSubscription();
        await checkSubscriptionStatus();
    };

    return (
        <div className="bg-background text-foreground w-full h-full border border-green-500 py-6 px-4 rounded-md">
            <div className="">
                <h1 className="text-3xl font-bold text-center">Activate Subscription</h1>

                <div className="my-6 mx-auto max-w-lg">
                    {/* Select Chain */}
                    <div className="flex items-center justify-between my-4">
                        <label className="font-semibold">Deploy commando on</label>
                        <select
                            className="bg-black border border-green-500 rounded-md px-4 py-2 text-foreground focus:outline-none"
                            value={selectedChain}
                            onChange={(e) => setSelectedChain(e.target.value)}
                        >
                            <option value="" disabled>Select chain</option>
                            <option value="Ethereum">Ethereum</option>
                            <option value="Binance Smart Chain">Binance Smart Chain</option>
                            <option value="Polygon">Polygon</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between my-4">
                        <label className="font-semibold">Price</label>
                        <span className="font-bold">$299 / Year</span>
                    </div>

                    {/* Payment Method */}
                    <div className="flex items-center justify-between my-4">
                        <label className="font-semibold">Payment method</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Crypto 1"
                                    checked={paymentMethod === 'Crypto 1'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="text-green-500 focus:ring-green-500"
                                />
                                <span className="ml-2">Crypto</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Crypto 2"
                                    checked={paymentMethod === 'Crypto 2'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="text-green-500 focus:ring-green-500"
                                />
                                <span className="ml-2">Crypto</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Crypto 3"
                                    checked={paymentMethod === 'Crypto 3'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="text-green-500 focus:ring-green-500"
                                />
                                <span className="ml-2">Crypto</span>
                            </label>
                        </div>
                    </div>

                    {/* Type */}
                    <div className="flex items-center justify-between my-4">
                        <label className="font-semibold">Type</label>
                        <span>NFT</span>
                    </div>

                    {/* Payment Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handlePayment}
                            className="bg-green-500 text-black font-semibold px-6 py-2 rounded-md hover:bg-green-600 transition"
                        >
                            {loading ?  <div className="loader"></div>  : "Make Payment"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InactiveSubs;
'use client'
import React, { useState } from 'react';
import { useSubscription } from "../../context/subscription";

const InactiveSubs = () => {
    const [selectedChain, setSelectedChain] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const { purchaseSubscription } = useSubscription(); 

  const handlePayment = async () => {
    if (!selectedChain || !paymentMethod) {
      alert('Please select a chain and payment method.');
      return;
    }
   await purchaseSubscription();
    alert(`Purchased subscription successfully!`);
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
            <option value="base">Base</option>
            <option value="arbitrum">Arbitrum</option>
            <option value="polygon">Polygon</option>
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
            Make Payment
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default InactiveSubs;
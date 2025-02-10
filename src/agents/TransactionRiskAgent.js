import { Agent } from "@covalenthq/ai-agent-sdk";
import { GoldRushClient } from "@covalenthq/client-sdk";
import "dotenv/config";

// Initialize the GoldRush client with your API key.
const goldRushClient = new GoldRushClient(process.env.NEXT_PUBLIC_GOLDRUSH_API_KEY);

// Create the TransactionRiskAgent that will analyze real transaction data.
const transactionRiskAgent = new Agent({
  name: "TransactionRiskAgent",
  model: {
    provider: "OPEN_AI",
    name: "gpt-4o-mini",
  },
  description:
    "Analyzes on-chain transaction activity using real data fetched via GoldRush APIs to detect potentially fraudulent or risky behavior.",
  instructions: [
    "Fetch real transaction data for the given wallet address using the GoldRushClient.",
    "Examine the latest transaction’s USD value, count of all transactions (as sender history), and token transfers (using log events).",
    "If the USD value exceeds $10,000, if there are fewer than 3 transactions, or if the latest transaction shows more than 5 log events, assign risk points accordingly.",
    "Return a final risk score between 0 and 100 along with any detected risk flags and a brief explanation."
  ],
  tools: {} // No extra tools supplied since we directly use the GoldRushClient
});

// Overwrite the agent's handler to integrate GoldRush's transaction API.
transactionRiskAgent.handler = async ({ address, chainId }) => {
  if (!address) {
    throw new Error("Wallet address is required.");
  }

  
  // Fetch real transaction history using GoldRush's Transactions API.
  const resp = await goldRushClient.TransactionService.getAllTransactionsForAddress(chainId, address, "USD");

  console.log(resp,"resp");
  
  if (resp.error || !resp.data || !resp.data.items || resp.data.items.length === 0) {
    throw new Error("No transaction data found for this address.");
  }
  
  const transactions = resp.data.items;
  const latestTx = transactions[0];
  
  // Extract key metrics from the latest transaction.
  const amountUSD = latestTx.value_quote ? parseFloat(latestTx.value_quote) : 0;
  const senderHistoryLength = transactions.length;
  const tokenMovementsCount = latestTx.log_events ? latestTx.log_events.length : 0;
  
  // Apply our simple rule-based risk assessment.
  let riskScore = 0;
  let alertFlags = [];
  
  if (amountUSD > 10000) {
    riskScore += 50;
    alertFlags.push("High transaction amount");
  }
  
  if (senderHistoryLength < 3) {
    riskScore += 20;
    alertFlags.push("Limited transaction history");
  }
  
  if (tokenMovementsCount > 5) {
    riskScore += 30;
    alertFlags.push("Multiple token transfers detected");
  }
  
  riskScore = Math.min(riskScore, 100);
  const explanation = `Risk score: ${riskScore}%. Flags: ${alertFlags.join(", ") || "None"}.`;
  
  return { 
    riskScore, 
    alertFlags, 
    explanation, 
    details: { 
      amountUSD, 
      senderHistoryLength, 
      tokenMovementsCount 
    } 
  };
};

export default transactionRiskAgent;
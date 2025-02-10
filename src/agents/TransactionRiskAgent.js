import { Agent, TransactionsTool } from "@covalenthq/ai-agent-sdk";
import "dotenv/config";

// Initialize the Transactions tool using your GoldRush API key.
const tools = {
    transactions: new TransactionsTool(process.env.NEXT_PUBLIC_GOLDRUSH_API_KEY),
};

// Create the TransactionRiskAgent using the Covalent AI Agent SDK.
const transactionRiskAgent = new Agent({
    name: "TransactionRiskAgent",
    model: {
        provider: "OPEN_AI",
        name: "gpt-4o-mini",
    },
    description: "An AI agent that analyzes on-chain transaction activity to detect potentially fraudulent or risky behavior.",
    instructions: [
        "Use the transactions tool to fetch the latest on-chain transactions for a given wallet address.",
        "Analyze the transaction details including the value of transactions, frequency, and token movements.",
        "Assess risk factors such as high transaction amounts, limited sender history, and excessive token transfers.",
        "Determine a risk score on a scale of 0 to 100 based on the analyzed data.",
        "Output the risk score, any detected anomalies (e.g., 'High transaction amount', 'Limited transaction history', 'Multiple token transfers'), and provide a brief explanation summarizing the observed risks."
    ],
    tools,
});

export default transactionRiskAgent;
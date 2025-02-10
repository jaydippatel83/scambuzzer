import TransactionRiskAgent from '../../../agents/TransactionRiskAgent';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
   
    // Parse JSON payload from the request
    const { address, chainId } = await req.json();

    // Validate that the wallet address is provided
    if (!address) {
      return NextResponse.json({ error: 'Wallet address is required.' }, { status: 400 });
    }



    // Execute the risk assessment using the TransactionRiskAgent
    const result = await TransactionRiskAgent.handler({ address, chainId });

    // Return the risk assessment result
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Risk assessment error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
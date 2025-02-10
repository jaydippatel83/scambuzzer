import TransactionRiskAgent from '../../../agents/TransactionRiskAgent';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }
  
  try {
    const { address, chainId } = req.body;
    if (!address) {
      return res.status(400).json({ error: 'Wallet address is required.' });
    }
    
    const result = await TransactionRiskAgent.handler({ address, chainId });
    res.status(200).json(result);
  } catch (error) {
    console.error("Risk assessment error:", error);
    res.status(500).json({ error: error.message });
  }
}
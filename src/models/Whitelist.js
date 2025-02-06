import mongoose from 'mongoose';

const WhitelistSchema = new mongoose.Schema({
  xHandle: { type: String, required: true },
  telegram: { type: String, required: true },
  website: { type: String, required: true },
  contractAddress: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Whitelist || mongoose.model('Whitelist', WhitelistSchema);

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    wallet: { type: String, required: true },
    username: { type: String, required: true },
    profilePicture: { type: String, required: true },
}, { timestamps: true });

const ReportSchema = new mongoose.Schema({
    link: { type: String, required: true },
    type: { type: String, required: true },
    targeting: { type: String, required: true },
    user: { type: UserSchema, required: true },
}, { timestamps: true });

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);    
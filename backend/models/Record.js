import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  deliverableId: { type: String, required: true },
  publishedOn: { type: String, required: true },
  qrCodeStatus: { type: String, default: 'VALIDATED' },
  name: { type: String, required: true },
  documentId: { type: String, required: true },
  issuedOn: { type: String, required: true },
  validUntil: { type: String, required: true },
  type: { type: String, required: true },
  model: { type: String, default: 'N/A' },
  company: { type: String, required: true },
  trainingLocation: { type: String, required: true },
  trainer: { type: String, required: true },
  isActive: { type: Boolean, default: true } // Active ya Inactive check karne ke liye
}, { timestamps: true });

export default mongoose.model('Record', recordSchema);
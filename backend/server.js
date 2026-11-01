import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import recordRoutes from './routes/recordRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// CORS configuration (allow requests from Vercel frontend)
app.use(cors());
app.use(express.json());

// Main Health Check Route (/api)
app.get('/api', (req, res) => {
  const dbState = mongoose.connection.readyState;
  let dbStatus = 'Disconnected';

  if (dbState === 1) dbStatus = 'Connected Successfully';
  else if (dbState === 2) dbStatus = 'Connecting...';

  res.status(200).json({
    success: true,
    message: 'Veritas Backend API Deployment Working!',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// App Routes
app.use('/api/records', recordRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connect Ho Gaya!');
    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => console.log(`Server port ${PORT} par chal raha hai`));
    }
  })
  .catch((err) => console.log('DB Connection Error:', err));

// Export for Vercel Serverless Function
export default app;
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import trainerRoutes from './routes/trainerRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Backend Server is Live and Healthy!');
});
app.use('/api/auth', authRoutes);
app.use('/api/trainers', trainerRoutes);

export default app;
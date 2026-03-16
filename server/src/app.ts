import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import trainerRoutes from './routes/trainerRoutes';
import studentReviewRoutes from './routes/studentReview.routes';
import analysisRoutes from "./modules/analysis/analysis.routes";
import errorMiddleware from "./middleware/error.middleware";
import feedbackRoutes from './routes/feedbackRoutes';
import responseRoutes from './routes/responseRoutes';
import testRoutes from './routes/testRoutes';

const app = express();

// CORS Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Backend Server is Live and Healthy!');
});
app.use('/api/auth', authRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/student-review', studentReviewRoutes);
app.use("/api/analysis", analysisRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/response', responseRoutes);
app.use('/api/test', testRoutes);

app.use(errorMiddleware);

export default app;
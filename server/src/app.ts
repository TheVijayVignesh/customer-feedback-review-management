import express from 'express';
import cors from 'cors';
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

app.use('/api/feedback', feedbackRoutes);
app.use('/api/response', responseRoutes);
app.use('/api/test', testRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

export default app;
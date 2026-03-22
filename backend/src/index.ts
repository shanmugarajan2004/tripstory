import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { authRouter } from './routes/auth.routes';
import { tripsRouter } from './routes/trips.routes';
import { storiesRouter } from './routes/stories.routes';
import { expensesRouter } from './routes/expenses.routes';
import { usersRouter } from './routes/users.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || true);
  },
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// General middleware
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (_, res) => {
  res.json({
    message: 'TripStory API',
    version: '1.0.0',
    endpoints: [
      '/health',
      '/api/auth',
      '/api/users',
      '/api/trips',
      '/api/stories',
      '/api/expenses'
    ]
  });
});

// API routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/expenses', expensesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.path} not found`
  });
});

// Error middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TripStory API running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
import express from 'express';
import profileRoutes from './routes/profileRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/profiles', profileRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
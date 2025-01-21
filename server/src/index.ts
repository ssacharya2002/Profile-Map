import express from 'express';
import profileRoutes from './routes/profileRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/profiles', profileRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
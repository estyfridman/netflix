import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './Rourers/authRouter.js';
import contentRouter from './Rourers/contentRouter.js';
import listsRouter from './Rourers/listsRouter.js';
import seedRouter from './Rourers/seedRouter.js';
import userRouter from './Rourers/userRouter.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials:true}));  
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/content', contentRouter);
app.use('/api/lists', listsRouter);
app.use('/api/seed', seedRouter);
app.use('/api/user', userRouter);

const allowedOrigin = 'http://localhost:3000';
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  next();
});

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => console.log(err));


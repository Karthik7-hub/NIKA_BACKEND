import express from 'express';
import 'dotenv/config.js';

import connectDB from './config/connectDB.js';
import authRoute from './routes/authRoutes.js';
import userRoute from './routes/userRoutes.js';
import adminRoute from './routes/adminRoutes.js';
import publicRoute from './routes/publicRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth/user", authRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/public", publicRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`))


import express, { Application } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import userRoutes from './users/routes/userRoutes';
import authRoutes from './users/routes/authRoutes';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);

// app.use(cors());
app.use(cors({
    origin: '*',  // or specify certain origins
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],  // specify allowed methods
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Origin', 'Access-Control-Allow-Origin']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", userRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});

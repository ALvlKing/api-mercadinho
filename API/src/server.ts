import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRouter from "./Routes/product.routes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow Frontend to access API
app.use(express.json()); // Parse JSON bodies
app.use("/products", productRouter);

// Health Check Endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "StockSync API is up and running!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



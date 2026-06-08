import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import expenseRoutes from "./routes/ExpenseRoute.js";
import { notFound , errorCheck } from "./middleware/errorCheck.js";

dotenv.config({quiet : true} );
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req , res) => {
    res.json({
        message: "Backend Running",
    });
});

app.use("/api/expenses", expenseRoutes);
app.use(notFound);
app.use(errorCheck);

const PORT = process.env.ENV_PORT || 5000;

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
});
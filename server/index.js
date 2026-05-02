import express from "express"

import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"


const app = express()
const PORT = process.env.PORT || 5000  

app.use(express.json())
app.use("/api/auth", authRoutes);

connectDB()

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});
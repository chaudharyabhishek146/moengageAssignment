const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")
const fs = require("fs")

const authRoutes = require("./routes/auth")
const listRoutes = require("./routes/lists")
const codeRoutes = require("./routes/code")
// Load environment variables
dotenv.config()

const app = express();

app.use(cors())
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Db connection error:", err));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/codes", codeRoutes)
app.use("/api/v1/lists", listRoutes)


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: "Something went wrong!" });
  })

port =  process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`Server running at ${port} `)
})

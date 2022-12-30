const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

const app = express();

// DB connection
connectDB();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// routes
app.use("/api/athletes", require("./routes/api/athletes"));
app.all("*", (req, res, next) => {
  res.status(404).json({ err: "Page Not found" });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("App has started on server 4000");
});

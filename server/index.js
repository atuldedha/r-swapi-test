require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const PORT = 8000;
const app = express();

// express middlewears
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// available routes
app.use("/api/auth", require("./routes/auth"));

// server to listen on PORT: 8000
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

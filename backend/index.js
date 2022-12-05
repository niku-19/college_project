const express = require("express");
const cors = require("cors");
const database = require("./database/index");
const dotenv = require("dotenv").config();
const app = express();
const PORT = 4000 || process.env.PORT;
const appRoutes = require("./routes/route");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    "Access-Control-Allow-Origin": "allow-origin",
  })
);

// Route Linking

app.use("/api/", appRoutes);
// app.use("/", (req, res) => {
//   res.json({
//     message: "Working",
//     status: 200,
//   });
// });

app.listen(PORT, () => console.log(`Server is up on ${PORT}`));

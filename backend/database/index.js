const mongoose = require("mongoose");
require('dotenv').config();
mongoose
  .connect(process.env.URI)
  .then((res) => console.log(`DB Connected`))
  .catch((err) => console.log("error in db connection.", err));

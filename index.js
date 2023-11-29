// Import packages
const express = require("express");

const app = express();
app.use(express.json());
const home = require("./routes/home");

const cors = require("cors");

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.json("Meme Bot");
});

// Middlewares


// Routes
app.use("/home", home);

// connection
const port = process.env.PORT || 9001;

app.listen(port, () => console.log(`Listening to port ${port}`));

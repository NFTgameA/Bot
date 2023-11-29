// Import packages
const express = require("express");

const app = express();
app.use(express.json());
require("dotenv/config");
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

const TelegramBot = require('node-telegram-bot-api');
const ChatGPTService = require('./services/chatgpt.service');

const telegramToken = process.env.TELEGRAM_KEY; 
// let telegramToken = "6668176688:AAEjsykJID2MjbTLsVfPGnZuSxZVA3N7bYg"


const bot = new TelegramBot(telegramToken, {polling: true});


bot.on('message', (msg) => {


    const chatId = msg.chat.id;   
    const chatMsg = msg.text;  
  
    console.log({chatId});   
    console.log({chatMsg}); 

  
    ChatGPTService.generateCompletion(chatMsg).then(responseMsg => {
      bot.sendMessage(chatId, responseMsg);
    });
  });

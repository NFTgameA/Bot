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

// const telegramToken = process.env.TELEGRAM_KEY; 
let telegramToken = "6668176688:AAEjsykJID2MjbTLsVfPGnZuSxZVA3N7bYg"


const bot = new TelegramBot(telegramToken, {polling: true});
// Define available commands with icons
const commands = [

    {
      text: "Launchpad",
      callback_data: "/BotMeme_bot launchpad",
      icon: "🚀"
    },
    {
      text: "NFT",
      callback_data: "/BotMeme_bot nft",
      icon: "🎨"
    },
    {
      text: "Airdrop",
      callback_data: "/BotMeme_bot airdrop",
      icon: "🪂"
    },
    {
      text: "Pre-Sale",
      callback_data: "/BotMeme_bot presale",
      icon: "💰"
    },
    {
      text: "Ask Bot",
      callback_data: "/BotMeme_bot ask_bot",
      icon: "🤖"
    }
  ];
  
  // Define states
  const states = {
    DEFAULT: 'default',
    ASKING_QUESTION: 'asking_question'
  };
  
  // Initialize state
  let currentState = states.DEFAULT;
  
  // Listen for any kind of message
  bot.on('text', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
  
    // Check if the message starts with '/'
    if (text.startsWith('/')) {
      // Check if the message is "/start"
      if (text === '/qs' || text === '/start' || text === 'qs' || text === 'start') {
        // Set state to ASKING_QUESTION
        currentState = states.ASKING_QUESTION;
  
        // Create a message with buttons and input field
        const responseText = "Please select a command or enter your question:";
        const options = {
          reply_markup: {
            inline_keyboard: [
              commands.slice(0,4).map((command) => {
                return {
                  text: `${command.icon} ${command.text}`,
                  callback_data: command.callback_data
                };
              }),
              [
                {
                  text: `${commands[4].icon} ${commands[4].text}`,
                  callback_data: commands[4].callback_data
                }
              ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          }
        };
  
        // Send the response message
        bot.sendMessage(chatId, responseText, options);
      } else {
        // Handle other commands
        // ...
      }
    }
  });
  
  // Listen for callback queries
  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
  
    // Send a reply to the callback query
    if (data === "/BotMeme_bot ask_bot") {
  
      const responseText = "Ask me a question:";
      const options = {
        reply_markup: {
          force_reply: true,
          input_field_placeholder: "Ask me a question:"
        }
      };
      bot.sendMessage(chatId, responseText, options);
      currentState = states.ASKING_QUESTION;
    } else if (data === "/BotMeme_bot nft") {
      let text = ` <b><i>🌟 🕒 Mint free start time : TBA 🌟</i></b> \n \n`
      
      bot.sendMessage(chatId,text, {parse_mode: "HTML"});
      currentState = states.DEFAULT;
    } else if(data === "/BotMeme_bot airdrop") {
      let text = `🕒 Comingsoon`
  
      bot.sendMessage(chatId,text);
      currentState = states.DEFAULT;
    }else if(data === "/BotMeme_bot presale") {
      
      let text = `🕒 Pre-Sale start time : TBA `
  
      bot.sendMessage(chatId,text);
      currentState = states.DEFAULT;
    }
    else{
   
  
      let text =`<b>OK
      `
      bot.sendMessage(chatId,text, {parse_mode: "HTML"});
      currentState = states.DEFAULT;
    }
  });
  
  // Listen for message from input field
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    // bot.onText(/^\/submittest (.+)/, (msg, match) => {
      if (text.startsWith('/submittest ')) {
  
      // const chatMsg = text.substr('/submittest '.length).toLocaleLowerCase();
      
   
      bot.sendMessage(chatId, "<b><i> 🌟 We have processed your request and would like to extend our sincere appreciation for your contribution. </i></b> 🌟", {parse_mode: "HTML"});
     return
    
  
    }
    // Check if the message is a question and in the ASKING_QUESTION state
    if (currentState === states.ASKING_QUESTION && !text.startsWith('/')) {
      console.log({text});
      ChatGPTService.generateCompletion(text).then(responseMsg => {
        bot.sendMessage(chatId, responseMsg, {parse_mode: "HTML"});
      });
      currentState = states.DEFAULT;
      
      if (text.toLowerCase().includes("ido")) {
        bot.sendMessage(chatId,"🕒 Upcoming release! Stay tuned for the latest updates. ");
        return
      }  
      if (text.toLowerCase().includes("nft")) {
        bot.sendMessage(chatId," <b><i>🌟 Free Mint Coming Soon 🌟</i></b> \n \nThe Bot's NFT system is divided into 4 tiers: Common, Rare , Epic, Lengendary. ", {parse_mode: "HTML"});
        return
      }  
  
  
      // bot.sendMessage(chatId, `You asked: ${text}`);
      // currentState = states.DEFAULT;
    }
  });

  

bot.on('message', (msg) => {


    const chatId = msg.chat.id;   
    const chatMsg = msg.text;  
  
    console.log({chatId});   
    console.log({chatMsg}); 

  
    ChatGPTService.generateCompletion(chatMsg).then(responseMsg => {
      bot.sendMessage(chatId, responseMsg);
    });
  });


const OpenAI = require('openai').default;

// ... rest of your code


class ChatGPTService { 
  rolePlayIntroduction = `As an expert chatbot named TOKI Bot, your main task is to chat with users as someone knowledgeable about crypto, life, society, political events, and current affairs, and ready to meet any user's requests. You are ready to listen and value the role and emotions of users during the conversation. You must remember all the information that users have provided during the conversation. During the chat, evidence and examples need to be provided to support the arguments and proposals you make. Note that the conversation must always be kept enjoyable and comfortable.I want all of your answers to refer to the Toki Bot project.Here is some information about the project,remember and answer relevant questions in the most objective way:Toki Bot is a TOKI is a forecasting analysis tool, track realtime price charts and trading history on Solana.  Some Toki Bot may offer the ability to schedule videos for posting at a later date/time. This can be very useful for maintaining a consistent posting schedule.
  
  Analytics and Reporting: Many Toki Bot will provide detailed analytics and reports on your activity and engagement, allowing you to track your progress and adjust your strategy as necessary.
  
  Direct Messaging: Some bots may be able to automate the process of sending direct messages to users, either to build relationships or to promote content/products.`
 
  async generateCompletion(prompt) {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });

    let fullPrompt = this.rolePlayIntroduction + '\n\n';
    fullPrompt += `User: ${prompt}\n`;
    fullPrompt += `Bot Meme: `;

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
          {
              role: "system",
              content: "You are a helpful assistant."
          },
          {
              role: "user",
              content: fullPrompt
          }
      ],
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return chatResponse.choices[0].message['content'].replace(/^\s+|\s+$/g, "");
  }
}

module.exports = new ChatGPTService();
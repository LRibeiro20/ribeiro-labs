require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function list() {
  try {
    const models = await genAI.getModels();
    console.log("Available models:");
    models.forEach(model => console.log(model.name));
  } catch(e) {
    console.error("No getModels method or error", e.message);
  }
}
list();

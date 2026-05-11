const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const apiKey = env.match(/GEMINI_API_KEY=(.*)/)[1].trim();

const { GoogleGenAI } = require('@google/genai');
async function m() { 
  const ai = new GoogleGenAI({ apiKey }); 
  const s = await ai.live.connect({
    model: 'gemini-2.0-flash-exp', // Let's test with gemini-2.0-flash-exp first
    config: { responseModalities: ['AUDIO', 'TEXT'] }, 
    callbacks: { 
      onopen: () => console.log('OPEN'), 
      onerror: e => console.log('ERROR:', e), 
      onclose: e => console.log('CLOSE:', e.reason, e.code), 
      onmessage: m => console.log('MSG:', JSON.stringify(m)) 
    } 
  }); 
} 
m();

const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const apiKey = env.match(/GEMINI_API_KEY=(.*)/)[1].trim();

async function getModels() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await res.json();
  data.models.forEach(m => {
    if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("bidiGenerateContent")) {
      console.log(m.name);
    }
  });
}
getModels();

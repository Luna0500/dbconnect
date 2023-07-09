require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);
const messages = [
  { role: 'user', content: 'write a whimsical paragraph about software development' }
];

const doIt = async () => {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    });
    console.log(completion.data);
    console.log(completion.data.choices[0].message);
    return (completion.data.choices[0].message);

  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

function App() {
  const output = JSON.parse(JSON.stringify(doIt()));
  return (
      <h1>{output}</h1>
  );
}

export default App;



require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const messages = [
  { role: 'user', content: 'write a whimsical paragraph about software development' }
];

export default function Message({ message }) {
  return (
      <div>
        <p>{message.content}</p>
      </div>
  );
}

export async function getServerSideProps() {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    });

    return {
      props: {message: completion.data.choices[0].message},
    };
  } catch (e) {
    console.error(e);
  }
}
import { OpenAI } from "openai";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,});


export default async function (req, res) {
  console.log('Preparing to ping OpenAI with the following data:');
  console.log(req.body);
  if (!openai.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const question = req.body.question || '';
  const homeFacts = req.body.homeFacts || '{}';
  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a question",
      }
    });
    return;
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: generatePrompt(question, homeFacts) }],
      model: 'gpt-4',
    });

    res.status(200).json({ result: chatCompletion.choices[0].message.content });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(question, homeFacts) {
  const capitalizedQuestion = question[0].toUpperCase() + question.slice(1).toLowerCase();
  const userData = JSON.stringify(homeFacts);
  const returnVal = `Please answer like a general, electrical, or HVAC contractor might.
  Do not use a salutation at the beginning or end -- this is a conversation, not a letter.
  Here's some relevant info on the homeowner's home, in JSON format.
  Please use if helpful in solving their problem: ${userData}

  Thanks!

  Question: ${capitalizedQuestion}`;
  return returnVal;
}

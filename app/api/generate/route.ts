import { NextResponse } from 'next/server';
import { OpenAI } from "openai";
import { NextRequest } from 'next/server';
import { Home } from '@/app/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateRequest {
  question: string;
  homeFacts: Home;
}

export async function POST(request: NextRequest) {
  try {
    const req = await request.json() as GenerateRequest;

    if (!openai.apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured, please follow instructions in README.md' },
        { status: 500 }
      );
    }

    const question = req.question || '';
    const homeFacts = req.homeFacts || {};
    
    if (question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please enter a question' },
        { status: 400 }
      );
    }

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: generatePrompt(question, homeFacts) }],
      model: 'gpt-4',
    });

    return NextResponse.json({
      result: chatCompletion.choices[0].message.content
    });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json(error.response.data, { status: error.response.status });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return NextResponse.json(
        { error: 'An error occurred during your request.' },
        { status: 500 }
      );
    }
  }
}

function generatePrompt(question: string, homeFacts: Home): string {
  const capitalizedQuestion = question[0].toUpperCase() + question.slice(1).toLowerCase();
  const userData = JSON.stringify(homeFacts);
  
  return `Please answer like a general, electrical, or HVAC contractor might.
  Do not use a salutation at the beginning or end -- this is a conversation, not a letter.
  Here's some relevant info on the homeowner's home, in JSON format.
  Please use if helpful in solving their problem: ${userData}

  Thanks!

  Question: ${capitalizedQuestion}`;
}
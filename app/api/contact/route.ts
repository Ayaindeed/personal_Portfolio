import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Create message object with timestamp
    const messageData = {
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };

    // Path to store messages
    const messagesPath = path.join(process.cwd(), 'messages', 'contacts.json');
    const messagesDir = path.join(process.cwd(), 'messages');

    // Create messages directory if it doesn't exist
    if (!fs.existsSync(messagesDir)) {
      fs.mkdirSync(messagesDir, { recursive: true });
    }

    // Read existing messages or create new array
    let messages = [];
    if (fs.existsSync(messagesPath)) {
      const fileContent = fs.readFileSync(messagesPath, 'utf-8');
      messages = JSON.parse(fileContent);
    }

    // Add new message
    messages.push(messageData);

    // Write back to file
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'Message received successfully!' 
    });

  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save message' },
      { status: 500 }
    );
  }
}

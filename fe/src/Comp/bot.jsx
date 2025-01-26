import { useState, useEffect } from 'react';
import menuData from '../data/menu.json'; // Import menu data

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

// Use a hardcoded API key for demonstration purposes
const API_KEY = "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";

const Bot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Heyy! Im Meme, your menu specialist! You can ask me what you want to eat and I can help you find the best options based on your preferences!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      if (response.choices && response.choices.length > 0) {
        const content = response.choices[0].message?.content;
        if (content) {
          const chatGPTResponse = {
            message: content,
            sender: "ChatGPT",
          };
          setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
        }
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    // Convert menu data to a string format
    const menuItems = menuData.map(item => `${item.name}: ${item.description}`).join(', ');

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: "system", content: `You are a menu AI suggesting on user's preference, ask user about their allergies and dietary restrictions, and what do they normally want to eat, and based on that suggest a menu for them. And maybe suggest if a certain main dish goes well with a certain side dish and drink. Here is the menu: ${menuItems}, but only output shortly and simply.` },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  return (
    <div className="App w-96 h-96">
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Meme is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return (
                  <div key={i} className={`p-2 my-2 ${message.sender === "ChatGPT" ? "text-left bg-yellow-500 text-white font-serif rounded-l-lg items-start" : "text-white font-serif text-right bg-blue-400 rounded-r-lg items-end"}`}>
                    <div>{message.message}</div>
                  </div>
                );
              })}
            </MessageList>
            <MessageInput 
              placeholder="Send a Message" 
              onSend={handleSendRequest} 
              className="mt-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />        
          </ChatContainer>
        </MainContainer>
      </div>
  );
}

export default Bot; 
'use client';

import { useState } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const addMessage = (type: 'user' | 'ai', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue('');
    setIsLoading(true);
    addMessage('user', userMessage);

    // Simulate AI response delay
    setTimeout(() => {
      let aiResponse = '';
      
      if (currentStep === 0 && userMessage.includes('github.com')) {
        aiResponse = "Getting started....I see it requires environment variables. Can you please share them.";
        setCurrentStep(1);
      } else if (currentStep === 1 && userMessage.includes('=')) {
        aiResponse = "Thank you...Deploying now.\n\nDeployment is done, here is the URL: https://your-app-123.agentic-deploy.com";
        setCurrentStep(2);
      } else if (currentStep === 2 && userMessage.includes('custom domain')) {
        aiResponse = "I see. I will send you some records to put on your DNS now.\n\nCNAME Record:\nName: www\nValue: your-app-123.agentic-deploy.com\n\nA Record:\nName: @\nValue: 192.0.2.1";
        setCurrentStep(3);
      } else if (currentStep === 3 && userMessage.includes('DNS')) {
        aiResponse = "Perfect, I have verified it and adding SSL now.\n\nAll done. Your website is live now at your custom domain!";
        setCurrentStep(4);
      } else {
        aiResponse = "I'm here to help you deploy your project. Please share your GitHub repository URL to get started.";
      }

      addMessage('ai', aiResponse);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Agentic Deploy</h1>
            </div>
            <div className="text-sm text-gray-500">
              AI-Powered Cloud Deployment
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {messages.length === 0 && (
          <div className="py-16 animate-fade-in-up">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                <span className="text-orange-500">Hello,</span> <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Divine</span>
              </h2>
              <p className="text-gray-500">Welcome back.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Deploy an app with AI</h3>
              <div className="relative">
                <textarea
                  placeholder="Paste your GitHub repository URL here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={3}
                />
                <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isLoading ? 'Sending...' : 'Deploy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Interface */}
        {messages.length > 0 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                <span className="text-orange-500">Hello,</span> <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Divine</span>
              </h2>
              <p className="text-gray-500">Welcome back.</p>
            </div>

            <div className="bg-gray-50 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
              <div className="p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg transition-all duration-200 ${
                        message.type === 'user'
                          ? 'bg-gray-800 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      <div className={`text-xs mt-2 opacity-70 ${
                        message.type === 'user' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-fade-in-up">
                    <div className="bg-white text-gray-900 border border-gray-200 px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <div className="flex space-x-4">
                <textarea
                  placeholder="Type your message here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
                  rows={2}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 self-end"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

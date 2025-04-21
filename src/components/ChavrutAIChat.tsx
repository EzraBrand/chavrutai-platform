import React, { useState, useEffect } from 'react';
import { X, MessageCircle, AlertTriangle } from 'lucide-react';
import { mcpClientService, ChatMessage } from './MCPClientService';

interface ChavrutAIChatProps {
  onClose: () => void;
}

const ChavrutAIChat: React.FC<ChavrutAIChatProps> = ({ onClose }) => {
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: "Shalom! I'm your ChavrutAI study partner. How can I help you understand this passage about resurrection from the Torah?" 
    },
    {
      role: 'assistant',
      content: "You can ask me about:\n- The meaning of technical terms\n- Historical context of this passage\n- The logical structure of the argument\n- Related concepts in Jewish thought"
    }
  ]);
  const [mcpConnected, setMcpConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Connect to MCP server when component mounts
  useEffect(() => {
    const connectToMCP = async () => {
      try {
        // Connect to MCP server
        const connected = await mcpClientService.connect();
        setMcpConnected(connected);
        
        if (connected) {
          // Add a success message
          setMessages(prev => [
            ...prev, 
            { 
              role: 'assistant', 
              content: "✓ Connected to Talmudic knowledge base via MCP. I now have access to the current text about resurrection of the dead." 
            }
          ]);
        } else {
          // Add an error message
          setMessages(prev => [
            ...prev, 
            { 
              role: 'assistant', 
              content: "⚠️ Unable to connect to the Talmudic knowledge base. Some features may be limited." 
            }
          ]);
        }
      } catch (error) {
        console.error("Failed to connect to MCP server:", error);
        setMcpConnected(false);
      }
    };
    
    connectToMCP();
    
    // Add connection listener for status updates
    const connectionListener = (connected: boolean) => {
      setMcpConnected(connected);
    };
    
    mcpClientService.addConnectionListener(connectionListener);
    
    // Cleanup on unmount
    return () => {
      mcpClientService.removeConnectionListener(connectionListener);
      mcpClientService.disconnect();
    };
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Process the message using MCP client service
      const response = await mcpClientService.processMessage(input);
      
      // Add assistant response
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error("Error processing message:", error);
      // Add error message
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I encountered an error while processing your request." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Defined styles to ensure proper positioning and appearance
  const chatContainerStyle = {
    position: 'fixed' as 'fixed',
    bottom: '1rem',
    right: '1rem',
    zIndex: 9999,
    width: minimized ? '14rem' : '20rem',
    maxWidth: '90vw',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white',
    borderRadius: '0.5rem 0.5rem 0 0',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as 'column',
    border: '1px solid #fde68a', // amber-200
  };

  return (
    <div style={chatContainerStyle}>
      {minimized ? (
        <div className="bg-amber-800 text-amber-50 px-3 py-1.5 rounded-t-lg shadow-lg flex items-center justify-between w-full">
          <h3 className="font-bold text-sm font-serif">ChavrutAI</h3>
          <div className="flex items-center">
            <button
              className="mx-1 hover:bg-amber-700 p-1 rounded transition-colors"
              onClick={() => setMinimized(false)}
            >
              <span className="text-xs leading-none">▲</span>
            </button>
            <button
              onClick={onClose}
              className="hover:bg-amber-700 p-1 rounded transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-amber-800 text-amber-50 p-1.5 flex items-center justify-between rounded-t-lg">
            <h3 className="font-bold text-sm font-serif flex items-center">
              <span>ChavrutAI Assistant</span>
              {mcpConnected ? (
                <span className="ml-1 text-xs bg-green-500 text-white px-1 rounded-sm">MCP</span>
              ) : (
                <span className="ml-1 text-xs bg-red-500 text-white px-1 rounded-sm flex items-center">
                  <AlertTriangle className="h-2 w-2 mr-0.5" />
                  Offline
                </span>
              )}
            </h3>
            <div className="flex items-center">
              <button
                className="mx-1 hover:bg-amber-700 p-1 rounded transition-colors"
                onClick={() => setMinimized(true)}
              >
                <span className="text-lg leading-none">_</span>
              </button>
              <button
                onClick={onClose}
                className="hover:bg-amber-700 p-1 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 p-2 overflow-y-auto bg-parchment-light max-h-80 min-h-48">
            {messages.map((message, index) => (
              <div key={index} className={`${
                message.role === 'assistant' 
                  ? 'bg-amber-100 border border-amber-200' 
                  : 'bg-white border border-amber-100 ml-6'
                } p-2 rounded-lg mb-2 max-w-xs shadow-sm`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="bg-amber-100 border border-amber-200 p-2 rounded-lg mb-2 max-w-xs shadow-sm">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse delay-150"></div>
                  <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            )}
          </div>
          <div className="p-2 border-t border-amber-200 bg-white">
            <div className="flex">
              <input
                type="text"
                placeholder="Ask about this passage..."
                className="flex-1 border border-amber-200 rounded-l p-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className={`${
                  isLoading 
                    ? 'bg-amber-400 cursor-not-allowed' 
                    : 'bg-amber-700 hover:bg-amber-800'
                } text-white px-2.5 py-1 rounded-r text-xs shadow-sm transition-colors`}
                onClick={handleSendMessage}
                disabled={isLoading}
              >
                Send
              </button>
            </div>
            {!mcpConnected && (
              <div className="mt-1 text-xs text-red-600 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span>Not connected to MCP server</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChavrutAIChat;

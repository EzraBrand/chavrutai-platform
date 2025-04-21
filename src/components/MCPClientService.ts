// Define the structure of a message in our chat
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Mock dictionary for term lookups
const termDictionary: Record<string, { definition: string, transliteration: string, language: string }> = {
  "תרומה": {
    definition: "Portion set aside as a gift for the priests",
    transliteration: "teruma",
    language: "hebrew"
  },
  "תחיית המתים": {
    definition: "Resurrection of the dead, a fundamental Jewish belief",
    transliteration: "techiyat hametim",
    language: "hebrew"
  }
};

/**
 * Browser-compatible MCP client service that provides simulated MCP functionality
 * Note: This is a mock implementation for use in the browser environment
 * In a full implementation, we would use the actual MCP SDK with Node.js
 */
class MCPClientService {
  private connected: boolean = false;
  private connectionListeners: Array<(connected: boolean) => void> = [];
  private connectionTimeout: any = null;

  // Simulate connection to MCP server
  async connect(): Promise<boolean> {
    console.log('Connecting to MCP server...');
    
    // Simulate network delay
    return new Promise((resolve) => {
      this.connectionTimeout = setTimeout(() => {
        this.connected = true;
        this.notifyConnectionListeners(true);
        console.log('Connected to mock MCP server with tools: ["lookup/term", "talmud/text"]');
        resolve(true);
      }, 1500);
    });
  }

  // Simulate disconnection
  async disconnect(): Promise<void> {
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
    }
    
    this.connected = false;
    this.notifyConnectionListeners(false);
    console.log('Disconnected from mock MCP server');
  }

  // Check connection status
  isConnected(): boolean {
    return this.connected;
  }

  // Add connection state listener
  addConnectionListener(listener: (connected: boolean) => void): void {
    this.connectionListeners.push(listener);
    listener(this.connected);
  }

  // Remove connection listener
  removeConnectionListener(listener: (connected: boolean) => void): void {
    const index = this.connectionListeners.indexOf(listener);
    if (index !== -1) {
      this.connectionListeners.splice(index, 1);
    }
  }

  // Notify all listeners of connection change
  private notifyConnectionListeners(connected: boolean): void {
    this.connectionListeners.forEach(listener => listener(connected));
  }

  // Simulate getting Talmudic text
  async getTalmudicText(tractate: string, page: string): Promise<string | null> {
    if (!this.connected) {
      console.error('MCP client not connected');
      return null;
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (tractate.toLowerCase() === 'sanhedrin' && page === '90a') {
      return `# Sanhedrin 90a

## Hebrew Text:
1. אמר רבי יוחנן: מניין לתחיית המתים מן התורה?
2. שנאמר: \"ונתתם ממנו [את] תרומת ה׳ לאהרן הכהן\".
3. וכי אהרן לעולם קיים?
4. והלא לא נכנס לארץ ישראל שנותנין לו תרומה!
5. אלא מלמד שעתיד לחיות, וישראל נותנין לו תרומה.
6. מכאן לתחיית המתים מן התורה.

## English Translation:
1. § Rabbi Yoḥanan says: From where is the resurrection of the dead derived from the Torah?
2. As it is stated: \"And you shall give the teruma of YHWH to Aaron the priest.\" (Numbers 18:28)
3. But does Aaron live forever?
4. Didn't he die before entering Eretz Yisrael, where teruma is given?
5. Rather, the verse teaches he will live again and receive teruma.
6. From here: resurrection of the dead is from the Torah.`;
    }
    
    return null;
  }

  // Simulate term lookup
  async lookupTerm(term: string): Promise<any | null> {
    if (!this.connected) {
      console.error('MCP client not connected');
      return null;
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const termEntry = termDictionary[term];
    if (!termEntry) {
      return {
        found: false,
        message: `No definition found for "${term}"`
      };
    }

    return {
      found: true,
      term: term,
      transliteration: termEntry.transliteration,
      definition: termEntry.definition,
      language: termEntry.language
    };
  }

  // Process a user message
  async processMessage(message: string): Promise<string> {
    if (!this.connected) {
      return "I'm currently not connected to the Talmudic knowledge base. Please try again later.";
    }

    // Add a slight delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Check if the message is asking about a term
      const termMatch = message.match(/(?:what is|meaning of|define|explain|lookup|definition of|תחיית המתים|תרומה|teruma)/i);
      
      if (termMatch) {
        // Extract potential Hebrew terms (basic detection)
        const hebrewTermMatch = message.match(/[\u0590-\u05FF\s]+/g);
        
        if (hebrewTermMatch) {
          const term = hebrewTermMatch[0].trim();
          const result = await this.lookupTerm(term);
          
          if (result && result.found) {
            return `**${result.term}** (${result.transliteration}): ${result.definition}`;
          }
        }
        
        // Check for specific terms we know about
        if (message.toLowerCase().includes('תחיית המתים') || 
            message.toLowerCase().includes('resurrection')) {
          return "In this passage, Rabbi Yoḥanan discusses **תחיית המתים** (techiyat hametim) - resurrection of the dead. He derives this concept from the Torah by noting that Numbers 18:28 states teruma should be given to Aaron, even though Aaron died before entering the land where teruma applies. This implies Aaron will be resurrected to receive the teruma.";
        }
        
        if (message.toLowerCase().includes('תרומה') || 
            message.toLowerCase().includes('teruma')) {
          return "**תרומה** (teruma) refers to the portion of produce set aside as a gift for the priests (kohanim). In the context of this passage, Rabbi Yoḥanan uses the verse about giving teruma to Aaron to prove resurrection, since Aaron was already dead when the Israelites entered the land where teruma would be given.";
        }
      }
      
      // If we reach here, provide a general response
      return "I've accessed the Talmudic text through the Model Context Protocol. This passage from Sanhedrin 90a discusses Rabbi Yohanan's proof for resurrection of the dead from the Torah. He cites Numbers 18:28 about giving teruma to Aaron, even though Aaron never entered the Land of Israel. How can I help you understand this passage better?";
      
    } catch (error) {
      console.error('Error processing message:', error);
      return "I encountered an error while processing your message. Please try again.";
    }
  }
}

// Create and export a singleton instance
export const mcpClientService = new MCPClientService();
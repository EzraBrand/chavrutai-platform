import { Server } from "@modelcontextprotocol/sdk/server";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

// Define paths to our Talmudic texts
const SUGYOT_DIR = path.join(__dirname, "../../sugyot");

// Create and configure the MCP server
const server = new Server({
  name: "TalmudicTextServer", 
  version: "1.0.0",
  description: "Provides Talmudic text resources for ChavrutAI"
});

// Schema for our text resource input
const TalmudReferenceSchema = z.object({
  tractate: z.string().describe("The name of the Talmudic tractate"),
  page: z.string().describe("The page reference (e.g., '90a', '22b')"),
});

// Define our text resource output schema
const TextOutputSchema = z.object({
  content: z.string(),
  mimeType: z.string()
});

// Register a resource to get Talmudic text
server.resource({
  name: "talmud/text",
  description: "Get the text and translation of a Talmudic passage",
  inputSchema: TalmudReferenceSchema,
  outputSchema: TextOutputSchema,
  handler: async ({ input }: { input: z.infer<typeof TalmudReferenceSchema> }) => {
    try {
      // Construct the filename from the tractate and page
      const filename = `${input.tractate.toLowerCase()}.${input.page}.json`;
      const filePath = path.join(SUGYOT_DIR, filename);
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`Text not found for ${input.tractate} ${input.page}`);
      }

      // Read and parse the file
      const textData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Format the content for the LLM
      const content = `
# ${input.tractate} ${input.page}

## Hebrew Text:
${textData.hebrew.map((text: string, i: number) => `${i+1}. ${text}`).join('\n')}

## English Translation:
${textData.english.map((text: string, i: number) => `${i+1}. ${text}`).join('\n')}
      `;

      return {
        content,
        mimeType: "text/markdown"
      };
    } catch (error) {
      console.error("Error retrieving Talmudic text:", error);
      throw new Error(`Failed to retrieve text for ${input.tractate} ${input.page}`);
    }
  }
});

// Schema for term lookup input
const TermLookupSchema = z.object({
  term: z.string().describe("The Hebrew or Aramaic term to look up"),
  language: z.enum(["hebrew", "aramaic"]).optional().describe("The language of the term")
});

// Register a tool for term definitions
server.tool({
  name: "lookup/term",
  description: "Look up the definition of a Hebrew or Aramaic term from the Talmud",
  inputSchema: TermLookupSchema,
  handler: async ({ input }: { input: z.infer<typeof TermLookupSchema> }) => {
    // Mock dictionary - in a real implementation, this would connect to a database
    const dictionary: Record<string, { definition: string, transliteration: string, language: string }> = {
      "תרומה": {
        definition: "Portion set aside as a gift for the priests",
        transliteration: "teruma",
        language: "hebrew"
      },
      "תחיית המתים": {
        definition: "Resurrection of the dead, a fundamental Jewish belief",
        transliteration: "techiyat hametim",
        language: "hebrew"
      },
      // Add more terms as needed
    };

    const term = input.term.trim();
    const termEntry = dictionary[term];

    if (!termEntry) {
      return {
        found: false,
        message: `No definition found for "${term}"`,
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
});

// Start the server
server.start().catch((error: Error) => {
  console.error("Failed to start MCP server:", error);
  process.exit(1);
});

console.log("ChavrutAI MCP server started!");
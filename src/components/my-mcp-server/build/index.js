"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@modelcontextprotocol/sdk");
const zod_1 = require("zod");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Define paths to our Talmudic texts
const SUGYOT_DIR = path.join(__dirname, "../../sugyot");
// Create and configure the MCP server
const server = new sdk_1.Server({
    name: "TalmudicTextServer",
    version: "1.0.0",
    description: "Provides Talmudic text resources for ChavrutAI"
});
// Schema for our text resource input
const TalmudReferenceSchema = zod_1.z.object({
    tractate: zod_1.z.string().describe("The name of the Talmudic tractate"),
    page: zod_1.z.string().describe("The page reference (e.g., '90a', '22b')"),
});
// Define our text resource output schema
const TextOutputSchema = zod_1.z.object({
    content: zod_1.z.string(),
    mimeType: zod_1.z.string()
});
// Register a resource to get Talmudic text
server.resource({
    name: "talmud/text",
    description: "Get the text and translation of a Talmudic passage",
    inputSchema: TalmudReferenceSchema,
    outputSchema: TextOutputSchema,
    handler: async ({ input }) => {
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
${textData.hebrew.map((text, i) => `${i + 1}. ${text}`).join('\n')}

## English Translation:
${textData.english.map((text, i) => `${i + 1}. ${text}`).join('\n')}
      `;
            return {
                content,
                mimeType: "text/markdown"
            };
        }
        catch (error) {
            console.error("Error retrieving Talmudic text:", error);
            throw new Error(`Failed to retrieve text for ${input.tractate} ${input.page}`);
        }
    }
});
// Schema for term lookup input
const TermLookupSchema = zod_1.z.object({
    term: zod_1.z.string().describe("The Hebrew or Aramaic term to look up"),
    language: zod_1.z.enum(["hebrew", "aramaic"]).optional().describe("The language of the term")
});
// Register a tool for term definitions
server.tool({
    name: "lookup/term",
    description: "Look up the definition of a Hebrew or Aramaic term from the Talmud",
    inputSchema: TermLookupSchema,
    handler: async ({ input }) => {
        // Mock dictionary - in a real implementation, this would connect to a database
        const dictionary = {
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
server.start().catch((error) => {
    console.error("Failed to start MCP server:", error);
    process.exit(1);
});
console.log("ChavrutAI MCP server started!");

import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

/**
 * Model Context Protocol (MCP) Server Handler for Vercel
 *
 * Implements Streamable HTTP transport (the modern stateless standard)
 * supporting Tools, Resources, and Prompts in a serverless environment.
 */
const handler = createMcpHandler(
  (server) => {
    // -------------------------------------------------------------
    // 1. TOOLS REGISTRATION
    // -------------------------------------------------------------

    /**
     * Tool: calculate
     * Description: Performs safe mathematical operations
     */
    server.registerTool(
      "calculate",
      {
        title: "Mathematical Calculator",
        description: "Executes basic and scientific mathematical calculations (addition, subtraction, multiplication, division, power, square root, etc.)",
        inputSchema: {
          operation: z.enum(["add", "subtract", "multiply", "divide", "power", "sqrt"]).describe("The arithmetic operation to perform"),
          a: z.number().describe("The primary operand"),
          b: z.number().optional().describe("The secondary operand (required for add, subtract, multiply, divide, power)"),
        },
      },
      async ({ operation, a, b }) => {
        let result: number;
        switch (operation) {
          case "add":
            if (b === undefined) throw new Error("Parameter 'b' is required for addition");
            result = a + b;
            break;
          case "subtract":
            if (b === undefined) throw new Error("Parameter 'b' is required for subtraction");
            result = a - b;
            break;
          case "multiply":
            if (b === undefined) throw new Error("Parameter 'b' is required for multiplication");
            result = a * b;
            break;
          case "divide":
            if (b === undefined) throw new Error("Parameter 'b' is required for division");
            if (b === 0) throw new Error("Division by zero is not allowed");
            result = a / b;
            break;
          case "power":
            if (b === undefined) throw new Error("Parameter 'b' is required for power");
            result = Math.pow(a, b);
            break;
          case "sqrt":
            if (a < 0) throw new Error("Square root of a negative number is not supported");
            result = Math.sqrt(a);
            break;
          default:
            throw new Error(`Unsupported operation: ${operation}`);
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ operation, operands: { a, b }, result }, null, 2),
            },
          ],
        };
      }
    );

    /**
     * Tool: text_analyzer
     * Description: Analyzes text metrics such as word count, reading time, and sentiment cues
     */
    server.registerTool(
      "text_analyzer",
      {
        title: "Text Analyzer",
        description: "Analyzes textual content to compute word count, character count, estimated reading time, and sentence metrics.",
        inputSchema: {
          text: z.string().min(1).describe("The text content to analyze"),
        },
      },
      async ({ text }) => {
        const words = text.trim().split(/\s+/).filter(Boolean);
        const wordCount = words.length;
        const charCount = text.length;
        const charCountNoSpaces = text.replace(/\s+/g, "").length;
        const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
        const sentenceCount = sentences.length;
        const readingTimeMinutes = (wordCount / 200).toFixed(2);

        const metrics = {
          wordCount,
          characterCount: charCount,
          characterCountNoSpaces: charCountNoSpaces,
          sentenceCount,
          averageWordsPerSentence: sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : "0",
          estimatedReadingTime: `${readingTimeMinutes} min (assuming 200 WPM)`,
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(metrics, null, 2),
            },
          ],
        };
      }
    );

    /**
     * Tool: time_utility
     * Description: Provides current UTC timestamp and timezone conversion
     */
    server.registerTool(
      "time_utility",
      {
        title: "Time and Timezone Utility",
        description: "Get the current time in UTC, convert between timezones, or format ISO timestamps.",
        inputSchema: {
          action: z.enum(["current_utc", "convert_timezone"]).describe("Action to perform"),
          timezone: z.string().optional().describe("Target IANA timezone (e.g. 'America/New_York', 'Asia/Dhaka', 'UTC')"),
        },
      },
      async ({ action, timezone = "UTC" }) => {
        const now = new Date();

        if (action === "current_utc") {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  iso: now.toISOString(),
                  utc_epoch_seconds: Math.floor(now.getTime() / 1000),
                  timezone: "UTC",
                }, null, 2),
              },
            ],
          };
        }

        try {
          const formatted = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            dateStyle: "full",
            timeStyle: "long",
          }).format(now);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  target_timezone: timezone,
                  formatted_time: formatted,
                  iso: now.toISOString(),
                }, null, 2),
              },
            ],
          };
        } catch (err: any) {
          throw new Error(`Invalid timezone '${timezone}': ${err.message}`);
        }
      }
    );

    // -------------------------------------------------------------
    // 2. RESOURCES REGISTRATION
    // -------------------------------------------------------------

    /**
     * Resource: server_info
     */
    server.registerResource(
      "system://info",
      {
        title: "Server Information",
        description: "Runtime specifications and capabilities of this Vercel MCP Server",
        mimeType: "application/json",
      },
      async () => {
        return {
          contents: [
            {
              uri: "system://info",
              mimeType: "application/json",
              text: JSON.stringify(
                {
                  name: "vercel-mcp-typescript-server",
                  version: "1.0.0",
                  environment: process.env.VERCEL_ENV || "development",
                  region: process.env.VERCEL_REGION || "local",
                  protocol: "Model Context Protocol (Streamable HTTP)",
                  status: "operational",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // -------------------------------------------------------------
    // 3. PROMPT TEMPLATES REGISTRATION
    // -------------------------------------------------------------

    /**
     * Prompt: code_review
     */
    server.registerPrompt(
      "code_review",
      {
        title: "Code Review Prompt",
        description: "Structured template for conducting high-standard code reviews",
        inputSchema: {
          language: z.string().describe("Programming language (e.g., TypeScript, Python, Go)"),
          code: z.string().describe("Source code snippet to review"),
        },
      },
      async ({ language, code }) => {
        return {
          description: `Code review checklist for ${language}`,
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: `Please perform a thorough code review of the following ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\nPlease evaluate:\n1. Architecture & Clean Code principles\n2. Security vulnerabilities\n3. Edge case handling & performance optimizations\n4. Concrete suggestions with refactored snippets.`,
              },
            },
          ],
        };
      }
    );
  },
  {
    serverInfo: {
      name: "vercel-mcp-typescript-server",
      version: "1.0.0",
    },
  },
  {
    basePath: "/api",
    verboseLogs: process.env.NODE_ENV !== "production",
  }
);

export { handler as GET, handler as POST };

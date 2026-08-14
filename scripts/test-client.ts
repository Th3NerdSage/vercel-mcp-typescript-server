import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

async function main() {
  const serverUrl = process.env.MCP_SERVER_URL || "http://localhost:3000/api/mcp";
  console.log(`\n📡 Connecting to MCP Server at: ${serverUrl}\n`);

  const transport = new StreamableHTTPClientTransport(new URL(serverUrl));
  const client = new Client(
    {
      name: "mcp-test-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  try {
    await client.connect(transport);
    console.log("✅ Successfully connected to MCP Server!");

    // 1. List Tools
    const tools = await client.listTools();
    console.log("\n🛠️ Discovered Tools:");
    tools.tools.forEach((t) => {
      console.log(` - ${t.name}: ${t.description}`);
    });

    // 2. Test calculator tool
    console.log("\n🧮 Testing 'calculate' tool (12 * 8)...");
    const calcResult = await client.callTool({
      name: "calculate",
      arguments: { operation: "multiply", a: 12, b: 8 },
    });
    console.log("Result:", calcResult.content);

    // 3. Test text_analyzer tool
    console.log("\n📝 Testing 'text_analyzer' tool...");
    const textResult = await client.callTool({
      name: "text_analyzer",
      arguments: { text: "Model Context Protocol brings interoperability to artificial intelligence systems on Vercel." },
    });
    console.log("Result:", textResult.content);

    console.log("\n🎉 All tests passed successfully!\n");
  } catch (error) {
    console.error("❌ Error testing MCP Server:", error);
  } finally {
    await client.close();
  }
}

main();

# Vercel TypeScript MCP Server 🚀

A production-ready **Model Context Protocol (MCP)** TypeScript Server designed specifically for **Vercel Serverless Functions** using the Next.js App Router and [`mcp-handler`](https://github.com/vercel/mcp-handler).

---

## 🌟 Why MCP on Vercel?

Traditional MCP servers communicate via `stdio` (standard input/output for local processes) or long-lived Server-Sent Events (SSE). 

On serverless architectures like Vercel, **Streamable HTTP Transport** provides:
- **Zero persistent server costs**: Spins up and down per-request with sub-millisecond cold starts.
- **Global Edge / Serverless deployment**: Scalable across worldwide regions with automatic TLS termination.
- **Universal compatibility**: Connect from **Claude Desktop**, **Cursor AI**, **Windsurf**, **Vercel AI SDK**, or any custom MCP client.

---

## 📦 Features & Capabilities

### 🛠️ Built-in Tools
- `calculate`: High-precision arithmetic and scientific operations (`add`, `subtract`, `multiply`, `divide`, `power`, `sqrt`).
- `text_analyzer`: Computes word counts, character density, sentence structures, and estimated reading time.
- `time_utility`: Returns exact UTC timestamps, epoch time, and converts across any IANA timezone.

### 📄 Resources
- `system://info`: Dynamic server specifications, runtime environment, and operational health.

### 💬 Prompts
- `code_review`: Comprehensive prompt template for automated multi-language code audits and refactoring recommendations.

---

## 🏗️ Architecture

```text
               ┌───────────────────────────────┐
               │    AI Host / Client           │
               │ (Claude Desktop, Cursor, etc) │
               └───────────────┬───────────────┘
                               │
                HTTP POST / GET (Streamable HTTP)
                               │
               ┌───────────────▼───────────────┐
               │     Vercel Edge / Serverless  │
               │   Route: /api/mcp/route.ts    │
               │                               │
               │   ┌────────────────────────┐  │
               │   │      mcp-handler       │  │
               │   └───────────┬────────────┘  │
               │               │               │
               │   ┌───────────▼────────────┐  │
               │   │ @modelcontextprotocol  │  │
               │   │      TypeScript SDK    │  │
               │   └────────────────────────┘  │
               └───────────────────────────────┘
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/Th3NerdSage/vercel-mcp-typescript-server.git
cd vercel-mcp-typescript-server
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Your MCP server is now live at `http://localhost:3000/api/mcp` and the dashboard at `http://localhost:3000`.

### 3. Test with the Built-in Test Client

```bash
npm run test:client
```

---

## ⚡ Deploy to Vercel

### Option A: One-Click Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option B: Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import `Th3NerdSage/vercel-mcp-typescript-server`.
3. Click **Deploy**.

Your production endpoint will be: `https://<your-project>.vercel.app/api/mcp`

---

## 🔌 Connecting with AI Clients

### 1. Claude Desktop (`claude_desktop_config.json`)

To connect Claude Desktop to your remote Vercel MCP server, use `mcp-remote`:

```json
{
  "mcpServers": {
    "vercel-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://<your-project>.vercel.app/api/mcp"
      ]
    }
  }
}
```

### 2. Cursor AI / Windsurf / VS Code

In Cursor:
1. Go to **Settings** -> **Features** -> **MCP**.
2. Click **+ Add New MCP Server**.
3. Set:
   - **Type**: `command`
   - **Command**: `npx -y mcp-remote https://<your-project>.vercel.app/api/mcp`

### 3. Vercel AI SDK Integration

```typescript
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { experimental_createMcpTools } from "@ai-sdk/mcp";

const transport = new StreamableHTTPClientTransport(
  new URL("https://<your-project>.vercel.app/api/mcp")
);

const mcpTools = await experimental_createMcpTools({ transport });
```

---

## 🛠️ Adding New Tools, Resources & Prompts

Edit `app/api/mcp/route.ts`:

```typescript
// Register a new Tool
server.registerTool(
  "my_custom_tool",
  {
    title: "My Custom Tool",
    description: "Brief explanation of what this tool does",
    inputSchema: {
      query: z.string().describe("Search query parameter"),
    },
  },
  async ({ query }) => {
    // Your business logic / DB call / API call here
    return {
      content: [
        {
          type: "text",
          text: `Processed query: ${query}`,
        },
      ],
    };
  }
);
```

---

## 📄 License

MIT © [Sadman Asad Samir (Th3NerdSage)](https://github.com/Th3NerdSage)

export default function Home() {
  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "48px 24px" }}>
      <header style={{ borderBottom: "1px solid #27272a", paddingBottom: "24px", marginBottom: "36px" }}>
        <div style={{ display: "inline-block", padding: "4px 12px", background: "#18181b", border: "1px solid #3f3f46", borderRadius: 999, fontSize: 13, color: "#a1a1aa", marginBottom: 12 }}>
          ⚡ Model Context Protocol (MCP)
        </div>
        <h1 style={{ fontSize: "36px", fontWeight: 700, margin: "0 0 12px 0", letterSpacing: "-0.02em" }}>
          TypeScript MCP Server on Vercel
        </h1>
        <p style={{ fontSize: "17px", color: "#a1a1aa", margin: 0, lineHeight: 1.6 }}>
          A production-ready remote MCP Server built with Next.js App Router and deployed effortlessly to Vercel Serverless Functions using Streamable HTTP.
        </p>
      </header>

      <section style={{ marginBottom: "36px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px", color: "#f4f4f5" }}>
          🔌 Endpoint URL
        </h2>
        <div style={{ background: "#18181b", padding: "16px 20px", borderRadius: 8, border: "1px solid #27272a", fontFamily: "monospace", color: "#22c55e", fontSize: "15px" }}>
          POST / GET &nbsp; <span style={{ color: "#e4e4e7" }}>/api/mcp</span>
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginBottom: "36px" }}>
        <div style={{ background: "#18181b", padding: "20px", borderRadius: 8, border: "1px solid #27272a" }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#38bdf8" }}>🛠️ Registered Tools</h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#a1a1aa", fontSize: "14px", lineHeight: 1.8 }}>
            <li><code>calculate</code>: Math engine</li>
            <li><code>text_analyzer</code>: Word count & readability</li>
            <li><code>time_utility</code>: Timezone & UTC converter</li>
          </ul>
        </div>

        <div style={{ background: "#18181b", padding: "20px", borderRadius: 8, border: "1px solid #27272a" }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#a78bfa" }}>📄 Resources</h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#a1a1aa", fontSize: "14px", lineHeight: 1.8 }}>
            <li><code>system://info</code>: Server metadata and health status</li>
          </ul>
        </div>

        <div style={{ background: "#18181b", padding: "20px", borderRadius: 8, border: "1px solid #27272a" }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#f472b6" }}>💬 Prompts</h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#a1a1aa", fontSize: "14px", lineHeight: 1.8 }}>
            <li><code>code_review</code>: Multi-language code evaluation</li>
          </ul>
        </div>
      </section>

      <section style={{ background: "#18181b", padding: "24px", borderRadius: 8, border: "1px solid #27272a", marginBottom: "36px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600, margin: "0 0 16px 0", color: "#f4f4f5" }}>
          🚀 Connect with AI Clients
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6, marginBottom: 16 }}>
          Add this server to your Claude Desktop or Cursor configuration using <code>mcp-remote</code>:
        </p>
        <pre style={{ background: "#09090b", padding: "16px", borderRadius: 6, overflowX: "auto", fontSize: "13px", color: "#f4f4f5", margin: 0, border: "1px solid #27272a" }}>
{`{
  "mcpServers": {
    "vercel-mcp": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://your-domain.vercel.app/api/mcp"]
    }
  }
}`}
        </pre>
      </section>

      <footer style={{ borderTop: "1px solid #27272a", paddingTop: "20px", color: "#71717a", fontSize: "13px", display: "flex", justifyContent: "space-between" }}>
        <span>Deployed on Vercel</span>
        <span>Powered by @modelcontextprotocol/sdk & mcp-handler</span>
      </footer>
    </main>
  );
}

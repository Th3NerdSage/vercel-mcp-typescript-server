import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vercel TypeScript MCP Server",
  description: "Model Context Protocol (MCP) Server on Vercel Serverless Functions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif", backgroundColor: "#09090b", color: "#fafafa" }}>
        {children}
      </body>
    </html>
  );
}

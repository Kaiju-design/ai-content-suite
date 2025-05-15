"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateContent() {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate content");
      } else {
        setResult(data.text);
      }
    } catch (err) {
      setError("Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>AI Content Creation Suite</h1>
      <textarea
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your marketing prompt here..."
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={generateContent} disabled={loading || !prompt}>
        {loading ? "Generating..." : "Generate Content"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap", background: "#f0f0f0", padding: "1rem", borderRadius: "8px" }}>
          {result}
        </div>
      )}
    </main>
  );
}

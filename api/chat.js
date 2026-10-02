import Groq from "groq-sdk";

const MODEL = "openai/gpt-oss-20b";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Chat service is not configured" });
  }

  const messages = req.body?.messages;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > 30
  ) {
    return res.status(400).json({ error: "Invalid chat messages" });
  }

  const validRoles = new Set(["system", "user", "assistant"]);
  let totalCharacters = 0;
  for (const message of messages) {
    if (
      !message ||
      !validRoles.has(message.role) ||
      typeof message.content !== "string" ||
      message.content.length > 5000
    ) {
      return res.status(400).json({ error: "Invalid chat messages" });
    }
    totalCharacters += message.content.length;
  }

  if (totalCharacters > 16000) {
    return res.status(400).json({ error: "Chat message limit exceeded" });
  }

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages,
      max_completion_tokens: 400,
    });
    const reply = completion.choices[0]?.message?.content;

    if (typeof reply !== "string") {
      return res
        .status(502)
        .json({ error: "Chat service returned an invalid response" });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error(
      "Groq request failed with status:",
      error?.status || "unknown",
    );
    return res.status(error?.status === 429 ? 429 : 502).json({
      error: "Chat service is temporarily unavailable",
    });
  }
}

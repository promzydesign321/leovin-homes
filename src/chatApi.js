export async function sendChatMessage(messages) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok || typeof data?.reply !== "string") {
    throw new Error("Chat service is temporarily unavailable");
  }

  return data.reply;
}

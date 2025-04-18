"use client";
import { useState } from "react";

export default function Chat() {
  type Message = {
    role: string;
    content: string;
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streamingResponse, setStreamingResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setStreamingResponse(""); // بداية جديدة للرد

    const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (!reader) return;

    let done = false;
    let responseContent = ""; // لتجميع الرد

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunk = decoder.decode(value);
      responseContent += chunk; // إضافة المحتوى الجديد

      // تحديث الحالة في كل مرة
      setStreamingResponse(responseContent);
    }

    // بعد اكتمال البث، إضافة الرد إلى الرسائل
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: responseContent },
    ]);
  };

  // دالة لتحسين تنسيق النص
  const formatResponse = (response: string) => {
    // إزالة العلامات غير الضرورية
    const cleanText = response.replace(/[\{\}\[\]"!]/g, "").trim();
    // تقسيم النص إلى فقرات منفصلة بناءً على الفقرات
    const paragraphs = cleanText
      .split("\n")
      .map((p, index) => <p key={index}>{p}</p>);
    return paragraphs;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full border rounded p-2"
        placeholder="Type something..."
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>

      <div className="mt-4 space-y-2">
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.role === "user" ? "🧑‍💻 You" : "🤖 AI"}:</strong>{" "}
            {msg.content}
          </p>
        ))}

        {streamingResponse && (
          <div>
            <strong>🤖 AI (typing):</strong>
            {formatResponse(streamingResponse)}
          </div>
        )}
      </div>
    </form>
  );
}

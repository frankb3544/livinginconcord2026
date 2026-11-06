import { useState, useCallback, useRef, useEffect } from "react";
import { postChatStream, ChatMessage } from "../endpoints/chat_POST.schema";

export type MessageWithId = ChatMessage & { id: string };

const INITIAL_MESSAGE: MessageWithId = {
  id: "initial",
  role: "assistant",
  content:
    "Welcome to Living In Concord NC! How may I assist you with your real estate needs today?",
};

const SESSION_STORAGE_KEY = "chatbot_auto_opened";
const AUTO_OPEN_DELAY_MS = 2000;

export const SUGGESTED_QUESTIONS_POOL = [
  "What neighborhoods do you recommend?",
  "Tell me about schools in Concord",
  "What are home prices in Concord?",
  "How do I start my relocation?",
  "What's the Concord real estate market like?",
  "Tell me about Highland Creek",
  "Is Concord NC a good place to live?",
  "How far is Concord from Charlotte?",
  "What's the cost of living in Concord?",
  "Can you help me find a home?",
  "What makes Concord different from Charlotte?",
  "Tell me about Cox Mill school district",
  "How do I schedule a consultation with Franklin?",
  "Can Franklin help me with a home valuation?",
  "I'm ready to start my home search — what's next?",
] as const;

function pickRandomQuestions(pool: readonly string[], count: number): string[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function trackQuestionClick(question: string) {
  if (typeof window === "undefined") return;

    const analytics = (window as unknown as Record<string, unknown>).__flootAnalytics as
    | { track: (event: string, properties: Record<string, unknown>) => void }
    | undefined;

  if (analytics?.track) {
    analytics.track("chatbot_question_click", { question });
  } else {
    window.dispatchEvent(
      new CustomEvent("floot-analytics", {
        detail: {
          event: "chatbot_question_click",
          properties: { question },
        },
      })
    );
  }
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageWithId[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(() =>
    pickRandomQuestions(SUGGESTED_QUESTIONS_POOL, 4)
  );
  const [showSuggestions, setShowSuggestions] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

    // Chat starts closed — no auto-open

  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);

  const clearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setSuggestedQuestions(pickRandomQuestions(SUGGESTED_QUESTIONS_POOL, 4));
    setShowSuggestions(true);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: MessageWithId = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
      };

      const assistantMessageId = (Date.now() + 1).toString();
      const initialAssistantMessage: MessageWithId = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, userMessage, initialAssistantMessage]);
      setIsLoading(true);

      // We only send user/assistant history to the API, excluding the temporary id
      const apiHistory = messages.map(({ role, content }) => ({ role, content }));
      apiHistory.push({ role: "user", content: userMessage.content });

      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        const response = await postChatStream(
          { messages: apiHistory },
          { signal: abortControllerRef.current.signal }
        );

        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");

          // Keep the last part in buffer if it doesn't end with \n\n
          buffer = parts.pop() || "";

          for (const part of parts) {
            const trimmed = part.trim();
            if (!trimmed.startsWith("data: ")) continue;

            const dataStr = trimmed.slice(6);
            if (dataStr === "[DONE]") {
              break;
            }

            try {
              const data = JSON.parse(dataStr);
              if (data.content) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: msg.content + data.content }
                      : msg
                  )
                );
              }
            } catch (e) {
              // Ignore partial or malformed chunks
            }
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Chatbot error:", error);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content:
                      "Sorry, I encountered an error connecting to the server. Please try again.",
                  }
                : msg
            )
          );
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [messages, isLoading]
  );

  const handleSuggestedQuestion = useCallback(
    (question: string) => {
      trackQuestionClick(question);
      setShowSuggestions(false);
      sendMessage(question);
    },
    [sendMessage]
  );

  return {
    isOpen,
    messages,
    isLoading,
    suggestedQuestions,
    showSuggestions,
    toggleChat,
    clearChat,
    sendMessage,
    handleSuggestedQuestion,
  };
}
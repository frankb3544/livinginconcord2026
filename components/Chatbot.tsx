import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { X, Send, RotateCcw } from "lucide-react";
import { useChatbot } from "../helpers/useChatbot";
import styles from "./Chatbot.module.css";

function parseMarkdownLinks(text: string) {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, index) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      const [, label, url] = match;
      if (url.startsWith("/")) {
        return (
          <Link key={index} to={url} className={styles.link}>
            {label}
          </Link>
        );
      }
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {label}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

interface ChatbotProps {
  className?: string;
}

export function Chatbot({ className }: ChatbotProps) {
  const {
    isOpen,
    messages,
    isLoading,
    suggestedQuestions,
    showSuggestions,
    toggleChat,
    clearChat,
    sendMessage,
    handleSuggestedQuestion,
  } = useChatbot();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`${styles.wrapper}${className ? ` ${className}` : ""}`}>
      {isOpen ? (
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.headerTitleGroup}>
              <span className={styles.headerTitle}>Living In Concord NC</span>
              <span className={styles.headerSubtitle}>Your real estate assistant</span>
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.iconBtn}
                onClick={clearChat}
                title="Reset Chat"
                aria-label="Reset Chat"
              >
                <RotateCcw size={16} />
              </button>
              <button
                className={styles.iconBtn}
                onClick={toggleChat}
                title="Close Chat"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <React.Fragment key={msg.id}>
                <div
                  className={`${styles.messageWrapper} ${
                    msg.role === "user"
                      ? styles.userWrapper
                      : styles.assistantWrapper
                  }`}
                >
                  <div
                    className={`${styles.messageBubble} ${
                      msg.role === "user"
                        ? styles.userBubble
                        : styles.assistantBubble
                    }`}
                  >
                    {msg.role === "assistant" && msg.content === "" ? (
                      <div className={styles.typingIndicator}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      parseMarkdownLinks(msg.content)
                    )}
                  </div>
                </div>

                {/* Show suggested questions after the initial assistant message */}
                {index === 0 &&
                  msg.role === "assistant" &&
                  showSuggestions &&
                  suggestedQuestions.length > 0 && (
                    <div className={styles.suggestionsContainer}>
                      {suggestedQuestions.map((question) => (
                        <button
                          key={question}
                          className={styles.suggestionBtn}
                          onClick={() => handleSuggestedQuestion(question)}
                          disabled={isLoading}
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  )}
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className={styles.input}
              disabled={
                isLoading &&
                messages[messages.length - 1]?.role !== "assistant"
              }
            />
            <button
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          className={styles.toggleBtn}
          onClick={toggleChat}
          aria-label="Open Chat"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}
    </div>
  );
}
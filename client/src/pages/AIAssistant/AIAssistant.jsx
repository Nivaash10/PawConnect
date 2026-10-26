import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  FaRobot,
  FaPaperPlane,
  FaTrash,
  FaUser,
  FaExclamationTriangle,
  FaLightbulb,
  FaPaw,
} from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import Footer from "../Home/sections/Footer";
import { useAuth } from "../../context/AuthContext";
import { sendAIMessage } from "../../services/aiService";

const SUGGESTED_PROMPTS = [
  "🐶 Puppy Vaccination Schedule",
  "🐱 Cat Feeding & Nutrition Guide",
  "🐕 House-Training & Potty Tips",
  "🚿 Dog Grooming Essentials",
  "🏠 First-Time Pet Adoption Prep",
];

const INITIAL_WELCOME_MESSAGE = {
  id: "msg-welcome",
  role: "assistant",
  content: `Hello! I am **PawConnect AI**, your dedicated pet-care assistant.\n\nAsk me anything about feeding, grooming, vaccination schedules, training, breed info, or adoption preparation!`,
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

function AIAssistant() {
  const { user } = useAuth();
  const location = useLocation();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("pawconnect_ai_chat");
    return saved ? JSON.parse(saved) : [INITIAL_WELCOME_MESSAGE];
  });
  const [inputPrompt, setInputPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // Save to session storage
  useEffect(() => {
    sessionStorage.setItem("pawconnect_ai_chat", JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle initial query from Home Page navigation
  useEffect(() => {
    if (location.state?.initialQuery) {
      const query = location.state.initialQuery;
      location.state.initialQuery = null; // consume
      handleSendMessage(query);
    }
  }, [location.state]);

  const handleSendMessage = async (textToSend) => {
    const promptText = (textToSend || inputPrompt).trim();
    if (!promptText || loading) return;

    const userMsg = {
      id: "msg-" + Date.now(),
      role: "user",
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt("");
    setLoading(true);

    try {
      const historyForAI = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await sendAIMessage(historyForAI, user?.user_metadata || {});

      const aiMsg = {
        id: "msg-ai-" + Date.now(),
        role: "assistant",
        content: res.text,
        isEmergency: res.isEmergency,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: "msg-err-" + Date.now(),
          role: "assistant",
          content: "I ran into a temporary connection error. Please try asking your question again!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
    sessionStorage.removeItem("pawconnect_ai_chat");
  };

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 text-white mb-6 shadow-lg shadow-orange-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-orange-100 text-xs font-semibold uppercase tracking-wider mb-1">
                <FaRobot className="text-sm" />
                24/7 AI Pet Companion
              </div>
              <h1 className="text-3xl font-bold">PawConnect AI Assistant</h1>
              <p className="text-orange-100 text-sm mt-1 max-w-xl">
                Get instant practical advice on nutrition, health guidance, grooming, training, vaccination schedules, and adoption prep.
              </p>
            </div>
            <button
              onClick={handleClearChat}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition"
            >
              <FaTrash /> Clear Chat
            </button>
          </div>

          {/* Suggested Prompts */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FaLightbulb className="text-amber-500 text-xs" /> Suggested Questions
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  className="bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600 border border-gray-200 hover:border-orange-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition shadow-xs"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[550px]">
            {/* Messages Scroll View */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      msg.role === "user"
                        ? "bg-orange-500 text-white"
                        : msg.isEmergency
                        ? "bg-red-500 text-white"
                        : "bg-orange-100 text-orange-600 border border-orange-200"
                    }`}
                  >
                    {msg.role === "user" ? <FaUser className="text-xs" /> : <FaRobot className="text-base" />}
                  </div>

                  {/* Message Bubble */}
                  <div className="space-y-1">
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-orange-500 text-white rounded-tr-none shadow-xs"
                          : msg.isEmergency
                          ? "bg-red-50 text-red-900 border border-red-200 rounded-tl-none shadow-xs"
                          : "bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-none"
                      }`}
                    >
                      {msg.isEmergency && (
                        <div className="flex items-center gap-1.5 text-red-600 font-bold text-xs uppercase mb-2">
                          <FaExclamationTriangle className="text-sm" /> Emergency Advice
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                    <p
                      className={`text-[10px] text-gray-400 px-1 ${
                        msg.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading Dots */}
              {loading && (
                <div className="flex gap-3 mr-auto max-w-[85%] items-center">
                  <div className="w-9 h-9 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-sm flex-shrink-0">
                    <FaRobot />
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl p-2 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition"
              >
                <input
                  type="text"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Ask PawConnect AI anything about your pet..."
                  className="flex-1 px-3 py-2 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={!inputPrompt.trim() || loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition disabled:opacity-40 flex items-center justify-center cursor-pointer shadow-xs"
                >
                  <FaPaperPlane className="text-xs" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AIAssistant;
import { Send, Mic, Square, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import useAIStore from "../../store/ai";

const QueryForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  
  const { ask, loading, error, clearError } = useAIStore();

  const examples = [
    "Show me top 10 customers by orders this year",
    "What's the average order value by month?",
    "List all products with low inventory",
    "Find users who haven't logged in for 30 days"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      clearError();
      const result = await ask(query);
      if (result.success) {
        onSubmit(query); // Switch to results tab
        setQuery(''); // Clear input
      }
    }
  };

  const handleExampleClick = (example) => {
    if (!loading) {
      setQuery(example);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      stopListening();
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return (
    <div>
      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 flex items-start gap-3">
          <div className="flex-1">{error}</div>
          <button 
            onClick={clearError}
            className="text-red-200 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      <div className="mb-8">
        <form onSubmit={handleSubmit}>
          <div className="relative mb-5">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              className="w-full p-5 pr-24 bg-white/10 border-2 border-white/10 rounded-xl text-white text-base resize-y min-h-[120px] focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all disabled:opacity-50"
              placeholder="Ask anything about your data in plain English..."
              disabled={loading}
            />

            {/* Mic button */}
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              disabled={loading}
              className={`absolute right-16 bottom-4 w-10 h-10 rounded-lg flex items-center justify-center transition-all disabled:opacity-50 ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gradient-to-br from-green-500 to-teal-600 hover:scale-105'
              }`}
            >
              {isListening ? (
                <Square className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5 text-white" />
              )}
            </button>

            {/* Submit button */}
            <button
              type="submit"
              className="absolute right-4 bottom-4 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!query.trim() || loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5">
        <h3 className="text-sm text-white/70 mb-3">Try these examples:</h3>
        <div className="flex flex-wrap gap-2">
          {examples.map((example, idx) => (
            <div
              key={idx}
              onClick={() => handleExampleClick(example)}
              className={`px-4 py-2 bg-white/10 border border-white/10 rounded-full text-sm transition-all ${
                loading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'cursor-pointer hover:bg-white/20 hover:-translate-y-0.5'
              }`}
            >
              {example}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueryForm;
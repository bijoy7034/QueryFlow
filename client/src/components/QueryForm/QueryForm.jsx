import { Send } from "lucide-react";
import { useState } from "react";

const QueryForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const examples = [
    "Show me top 10 customers by orders this year",
    "What's the average order value by month?",
    "List all products with low inventory",
    "Find users who haven't logged in for 30 days"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="relative mb-5">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-5 pr-14 bg-white/10 border-2 border-white/10 rounded-xl text-white text-base resize-y min-h-[120px] focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all"
            placeholder="Ask anything about your data in plain English...&#10;&#10;Example: Show me the top 10 customers by revenue this quarter"
          />
          <button
            onClick={handleSubmit}
            className="absolute right-4 bottom-4 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50"
            disabled={!query.trim()}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-sm text-white/70 mb-3">Try these examples:</h3>
        <div className="flex flex-wrap gap-2">
          {examples.map((example, idx) => (
            <div
              key={idx}
              onClick={() => setQuery(example)}
              className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-sm cursor-pointer hover:bg-white/20 hover:-translate-y-0.5 transition-all"
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
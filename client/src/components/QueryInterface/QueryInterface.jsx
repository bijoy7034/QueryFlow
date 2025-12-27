// components/QueryInterface/QueryInterface.jsx
import { Clock, Trash2 } from "lucide-react";
import QueryForm from "../QueryForm/QueryForm";
import ResultsDisplay from "../ResultDisplay/ResultDisplay";
import { useState } from "react";
import useAIStore from "../../store/ai";
import MarkdownDisplay from "../MarkdownDisplay/MarkdownDisplay";

const QueryInterface = () => {
  const [activeTab, setActiveTab] = useState('query');
  const { queryHistory, clearHistory } = useAIStore();

  const tabs = [
    { id: 'query', label: 'Query' },
    { id: 'results', label: 'Results' },
    { id: 'history', label: 'History', count: queryHistory.length }
  ];

  const handleQuerySubmit = () => {
    setActiveTab('results');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const safeRender = (content) => {
    if (typeof content !== 'string') {
      return JSON.stringify(content, null, 2);
    }
    return content;
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
      <div className="flex gap-2 mb-6 border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-all relative ${
              activeTab === tab.id
                ? 'text-white border-blue-500'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'query' && <QueryForm onSubmit={handleQuerySubmit} />}
      
      {activeTab === 'results' && <ResultsDisplay />}
      
      {activeTab === 'history' && (
        <div>
          {queryHistory.length === 0 ? (
            <div className="text-center py-16 text-white/50">
              <Clock className="w-16 h-16 mx-auto mb-5" />
              <p>No query history yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Query History ({queryHistory.length})
                </h3>
                <button
                  onClick={clearHistory}
                  className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              {queryHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-white/50 text-xs">
                      {formatTimestamp(item.timestamp)}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-white/70 text-xs mb-1">Query:</div>
                    <div className="text-cyan-300 text-sm bg-black/20 p-3 rounded border border-white/10">
                      {safeRender(item.query)}
                    </div>
                  </div>

                  <div>
                    <div className="text-white/70 text-xs mb-1">Response:</div>
                    <div className="bg-black/20 p-3 rounded border border-white/10 max-h-64 overflow-y-auto">
                      {item.isMarkdown ? (
                        <div className="text-sm">
                          <MarkdownDisplay content={safeRender(item.response)} />
                        </div>
                      ) : (
                        <div className="text-white text-sm whitespace-pre-wrap">
                          {safeRender(item.response)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QueryInterface;
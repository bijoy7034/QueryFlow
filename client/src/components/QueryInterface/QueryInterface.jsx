import { Clock } from "lucide-react";
import QueryForm from "../QueryForm/QueryForm";
import ResultsDisplay from "../ResultDisplay/ResultDisplay";
import { useState } from "react";

const QueryInterface = () => {
  const [activeTab, setActiveTab] = useState('query');
  const [currentQuery, setCurrentQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'query', label: 'Query' },
    { id: 'results', label: 'Results' },
    { id: 'history', label: 'History' }
  ];

  const handleQuerySubmit = (query) => {
    setCurrentQuery(query);
    setActiveTab('results');
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
      <div className="flex gap-2 mb-6 border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.id
                ? 'text-white border-blue-500'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'query' && <QueryForm onSubmit={handleQuerySubmit} />}
      {activeTab === 'results' && <ResultsDisplay query={currentQuery} loading={loading} />}
      {activeTab === 'history' && (
        <div className="text-center py-16 text-white/50">
          <Clock className="w-16 h-16 mx-auto mb-5" />
          <p>No query history yet.</p>
        </div>
      )}
    </div>
  );
};

export default QueryInterface;
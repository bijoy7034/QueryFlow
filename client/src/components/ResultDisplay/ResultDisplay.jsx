import { Database, FileText, MessageSquare } from "lucide-react";

const ResultsDisplay = ({ query, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />
        <p className="mt-5 text-white/70">Processing your query...</p>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="text-center py-16 text-white/50">
        <FileText className="w-16 h-16 mx-auto mb-5" />
        <p>No results yet. Submit a query to see results here.</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Your Query
          </h3>
        </div>
        <div className="bg-black/30 p-5 rounded-lg border border-white/10 overflow-x-auto">
          <code className="text-cyan-300 text-sm">{query}</code>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base flex items-center gap-2">
            <Database className="w-4 h-4" />
            Generated SQL
          </h3>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
            ✓ Validated
          </span>
        </div>
        <div className="bg-black/30 p-5 rounded-lg border border-white/10 overflow-x-auto">
          <code className="text-cyan-300 text-sm whitespace-pre">
            {`SELECT users.name, COUNT(orders.id) as order_count
                FROM users
                LEFT JOIN orders ON users.id = orders.user_id
                WHERE orders.created_at >= '2024-01-01'
                GROUP BY users.name
                ORDER BY order_count DESC
                LIMIT 10;`
            }
          </code>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Query Results
          </h3>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
            4 rows • 127ms
          </span>
        </div>
        <div className="bg-black/20 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-500/20">
                <th className="px-3 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-3 py-3 text-left text-sm font-semibold">
                  Order Count
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Alice Johnson", count: 47 },
                { name: "Bob Smith", count: 42 },
                { name: "Carol Davis", count: 38 },
                { name: "David Brown", count: 35 },
              ].map((row, idx) => (
                <tr
                  key={idx}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-3 py-3 text-sm">{row.name}</td>
                  <td className="px-3 py-3 text-sm">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ResultsDisplay;

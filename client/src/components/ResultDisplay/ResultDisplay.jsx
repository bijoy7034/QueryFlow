import { useCallback } from "react";
import {
  Database,
  FileText,
  AlertCircle,
  Download,
} from "lucide-react";

import useAIStore from "../../store/ai";
import MarkdownDisplay from "../MarkdownDisplay/MarkdownDisplay";

const ResultsDisplay = () => {
  const {
    currentQuery,
    currentResponse,
    isMarkdown,
    loading,
    error,
  } = useAIStore();

  /**
   * Safely normalize response to string
   */
  const normalizeResponse = useCallback((response) => {
    if (typeof response === "string") return response;

    if (response && typeof response === "object") {
      return JSON.stringify(response, null, 2);
    }

    return String(response ?? "");
  }, []);

  /**
   * Download markdown response
   */
  const downloadMarkdown = () => {
    const content = normalizeResponse(currentResponse);

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `query-response-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Loading state
   */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />
        <p className="mt-5 text-white/70">
          Processing your query...
        </p>
      </div>
    );
  }

  /**
   * Error state
   */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="w-16 h-16 text-red-400 mb-5" />
        <p className="text-red-400 text-center max-w-md">
          {error}
        </p>
      </div>
    );
  }

  /**
   * Empty state
   */
  if (!currentQuery || currentResponse == null) {
    return (
      <div className="text-center py-16 text-white/50">
        <FileText className="w-16 h-16 mx-auto mb-5" />
        <p>
          No results yet. Submit a query to see results here.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Database className="w-5 h-5" />
          Query Results
        </h3>

        {isMarkdown && (
          <button
            onClick={downloadMarkdown}
            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg
                       hover:bg-blue-500/30 transition-all
                       flex items-center gap-2 text-sm"
          >
            <Download className="w-4 h-4" />
            Download MD
          </button>
        )}
      </div>

      {/* Response */}
      <div className="bg-black/30 p-6 rounded-lg border border-white/10 overflow-x-auto">
        {isMarkdown ? (
          <MarkdownDisplay content={normalizeResponse(currentResponse)} />
        ) : (
          <pre className="text-white text-sm whitespace-pre-wrap">
            {normalizeResponse(currentResponse)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownDisplay = ({ content }) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");

            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg my-4"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }

            return (
              <code className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-sm">
                {children}
              </code>
            );
          },

          table({ children }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="w-full border-collapse">
                  {children}
                </table>
              </div>
            );
          },

          thead({ children }) {
            return <thead className="bg-blue-500/20">{children}</thead>;
          },

          tr({ children }) {
            return (
              <tr className="border-b border-white/10 hover:bg-white/5">
                {children}
              </tr>
            );
          },

          th({ children }) {
            return (
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                {children}
              </th>
            );
          },

          td({ children }) {
            return (
              <td className="px-4 py-3 text-sm text-white/90">
                {children}
              </td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;

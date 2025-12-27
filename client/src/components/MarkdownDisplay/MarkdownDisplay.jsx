import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownDisplay = ({ content }) => {
  return (
    <ReactMarkdown
      className="markdown-content"
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              className="rounded-lg my-4"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-sm"
              {...props}
            >
              {children}
            </code>
          );
        },

        table({ children }) {
          return (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">{children}</table>
            </div>
          );
        },
        thead({ children }) {
          return <thead className="bg-blue-500/20">{children}</thead>;
        },
        tbody({ children }) {
          return <tbody>{children}</tbody>;
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
            <td className="px-4 py-3 text-sm text-white/90">{children}</td>
          );
        },
        h1({ children }) {
          return (
            <h1 className="text-3xl font-bold text-white mb-4 mt-6">
              {children}
            </h1>
          );
        },
        h2({ children }) {
          return (
            <h2 className="text-2xl font-bold text-white mb-3 mt-5">
              {children}
            </h2>
          );
        },
        h3({ children }) {
          return (
            <h3 className="text-xl font-semibold text-white mb-2 mt-4">
              {children}
            </h3>
          );
        },
        h4({ children }) {
          return (
            <h4 className="text-lg font-semibold text-white mb-2 mt-3">
              {children}
            </h4>
          );
        },

        p({ children }) {
          return (
            <p className="text-white/90 mb-3 leading-relaxed">{children}</p>
          );
        },

        ul({ children }) {
          return (
            <ul className="list-disc list-inside mb-3 space-y-1 text-white/90">
              {children}
            </ul>
          );
        },
        ol({ children }) {
          return (
            <ol className="list-decimal list-inside mb-3 space-y-1 text-white/90">
              {children}
            </ol>
          );
        },
        li({ children }) {
          return <li className="ml-4">{children}</li>;
        },
        // Links
        a({ href, children }) {
          return (
            <a
              href={href}
              className="text-blue-400 hover:text-blue-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          );
        },


        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-3 bg-white/5 italic text-white/80">
              {children}
            </blockquote>
          );
        },
        // Horizontal rules
        hr() {
          return <hr className="border-white/10 my-6" />;
        },
        // Strong/Bold
        strong({ children }) {
          return <strong className="font-bold text-white">{children}</strong>;
        },
        // Emphasis/Italic
        em({ children }) {
          return <em className="italic text-white/90">{children}</em>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownDisplay;

"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

export function MarkdownDocBody({ content }: Props) {
  return (
    <article className="prose-docs max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="mb-4 mt-0 text-3xl font-bold text-white">{children}</h1>,
          h2: ({ children }) => (
            <h2 className="mb-3 mt-10 scroll-mt-24 border-b border-zinc-800 pb-2 text-2xl font-semibold text-white first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => <h3 className="mb-2 mt-8 text-lg font-semibold text-zinc-100">{children}</h3>,
          p: ({ children }) => <p className="mb-4 leading-relaxed text-zinc-400">{children}</p>,
          ul: ({ children }) => <ul className="mb-4 list-inside list-disc space-y-2 text-zinc-400">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 list-inside list-decimal space-y-2 text-zinc-400">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-zinc-200">{children}</strong>,
          a: ({ href, children }) => (
            <a href={href} className="text-accent underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const isFenced = Boolean(className?.startsWith("language-"));
            if (isFenced) {
              return <code className={`${className ?? ""} font-mono text-sm text-zinc-200`}>{children}</code>;
            }
            return <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-accent">{children}</code>;
          },
          pre: ({ children }) => (
            <pre className="mb-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">{children}</pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-4 border-r-4 border-accent/50 pr-4 text-zinc-500 italic">{children}</blockquote>
          ),
          table: ({ children }) => (
            <div className="mb-4 overflow-x-auto rounded-lg border border-zinc-800">
              <table className="w-full border-collapse text-sm text-zinc-300">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-zinc-800 bg-zinc-900 px-3 py-2 text-right font-semibold text-zinc-200">{children}</th>
          ),
          td: ({ children }) => <td className="border border-zinc-800 px-3 py-2 text-right">{children}</td>,
          hr: () => <hr className="my-8 border-zinc-800" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

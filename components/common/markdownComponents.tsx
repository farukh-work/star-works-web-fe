"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import Link from "next/link";

// ==============================
// COPY BUTTON
// ==============================
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="rounded border border-white/10 px-3 py-1 font-mono text-xs text-white/50 transition-all hover:text-white"
    >
      {copied ? "✓ Copied!" : "Copy"}
    </button>
  );
}

// ==============================
// MARKDOWN COMPONENTS
// ==============================
const markdownComponents = {
  h1: ({ children }: any) => (
    <h1 className="mb-8 text-4xl leading-[120%] font-bold text-white sm:mt-8 md:text-5xl">
      {children}
    </h1>
  ),

  h2: ({ children }: any) => (
    <h2 className="mt-8 mb-4 text-xl leading-[120%] font-bold text-white sm:text-2xl md:text-3xl">
      {children}
    </h2>
  ),

  h3: ({ children }: any) => (
    <h3 className="mt-6 mb-4 text-lg leading-[130%] font-semibold text-white sm:text-xl md:text-2xl">
      {children}
    </h3>
  ),

  p: ({ children }: any) => (
    <p className="text-antiflash mb-4 text-sm leading-[150%] md:text-base">
      {children}
    </p>
  ),

  ul: ({ children }: any) => (
    <ul className="text-antiflash mb-4 list-disc space-y-3 pl-6 text-sm md:text-base">
      {children}
    </ul>
  ),

  ol: ({ children }: any) => (
    <ol className="text-antiflash mb-4 list-decimal space-y-3 pl-6 text-sm md:text-base">
      {children}
    </ol>
  ),

  li: ({ children }: any) => (
    <li className="text-sm leading-[150%] md:text-base">{children}</li>
  ),

  strong: ({ children }: any) => (
    <strong className="text-sm font-bold text-white md:text-base">
      {children}
    </strong>
  ),

  em: ({ children }: any) => (
    <em className="text-primary text-sm italic md:text-base">{children}</em>
  ),

  blockquote: ({ children }: any) => (
    <blockquote className="border-primary my-8 border-l-4 bg-white/5 py-4 pl-6 text-lg text-white/70 italic">
      {children}
    </blockquote>
  ),

  hr: () => <hr className="my-6 border-white/10" />,

  a: ({ children, href }: any) => (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-4 transition-all duration-300 hover:opacity-80"
    >
      {children}
    </Link>
  ),

  img: ({ src, alt }: any) => (
    <img src={src} alt={alt} className="my-8 w-full rounded-2xl" />
  ),

  // ==============================
  // TABLE
  // ==============================
  table: ({ children }: any) => (
    <div className="mb-8 overflow-x-auto">
      <table className="w-full border-collapse border border-white/10 text-left">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-white/10">{children}</thead>
  ),
  tbody: ({ children }: any) => <tbody>{children}</tbody>,
  tr: ({ children }: any) => (
    <tr className="border-b border-white/10">{children}</tr>
  ),
  th: ({ children }: any) => (
    <th className="px-4 py-3 font-semibold text-white">{children}</th>
  ),
  td: ({ children }: any) => (
    <td className="text-antiflash px-4 py-3">{children}</td>
  ),

  // ==============================
  // CODE — FIXED (inline prop removed)
  // ==============================
  code({ className, children }: any) {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");

    // Fenced code block (has language class)
    if (match) {
      return (
        <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 w-full max-w-full">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
            <span className="font-mono text-xs text-white/40">{match[1]}</span>
            <CopyButton code={codeString} />
          </div>

          {/* Syntax Highlighted Code */}
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
            showLineNumbers
            customStyle={{
              margin: 0,
              borderRadius: 0,
              background: "#0d0d0d",
              padding: "1.25rem",
              fontSize: "0.8125rem",
              lineHeight: "1.7",
              overflowX: "auto",
            }}
            // codeTagProps={{
            //   style: {
            //     fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            //   },
            // }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
    }

    // Inline code (no language class)
    return (
      <code className="text-primary rounded-md bg-white/10 px-2 py-1 font-mono text-xs sm:text-sm break-all whitespace-normal inline-block max-w-full">
        {children}
      </code>
    );
  },
};

export default markdownComponents;

import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useRouter } from "next/router";
import "github-markdown-css";
import { getAboutData } from "../lib/blog";
export async function getStaticProps() {
  const about = getAboutData();
  return { props: { about } };
}
function About({ about }: { about: string }) {
  return (
    <div className="flex w-2/3 m-auto py-20 dark:bg-[#0d1117] dark:text-[#c9d1d9] sm:w-full sm:px-8">
      <div
        className="markdown-body"
        style={{ fontSize: "18px", height: "100%", width: "100%" }}
      >
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  {...props}
                  style={docco}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {about}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default About;

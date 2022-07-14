import React from "react";
import { IPostData } from ".";
import {
  getPostDataById,
  getPostDetailById,
  getSortedPostsData,
} from "../lib/posts";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useRouter } from "next/router";
import "github-markdown-css";
import Utterances from "../components/utterances";
interface IParams {
  params: {
    id: string;
  };
}
interface IProps {
  postData: IPostData;
  detail: string;
}
export async function getStaticPaths() {
  const allPostData = getSortedPostsData();
  const paths = allPostData.map((postData) => {
    return { params: { id: postData.id } };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: IParams) {
  const postData = getPostDataById(params.id);
  const detail = getPostDetailById(params.id);

  if (!postData) {
    return { props: {} };
  }
  return { props: { postData, detail } };
}

function PostDetail({ postData, detail }: IProps) {
  const router = useRouter();
  const onTagClick = (tag: string) => {
    router.push(`/?tag=${tag}`);
  };
  if (!postData) {
    return <div>존재하지 않는 게시글입니다.</div>;
  }
  return (
    <div className="flex flex-col w-3/5 m-auto pt-20 pb-20 gap-10 dark:bg-[#0d1117] dark:text-[#c9d1d9]">
      <div className="text-5xl font-bold ">{postData.title}</div>
      <div className="flex flex-col gap-2">
        <div className="text-base text-gray-600 dark:text-gray-300">
          {postData.date}
        </div>
        <div className="flex gap-2 dark:text-black">
          {postData.tags.split(", ").map((tag: string) => (
            <span
              className={
                "p-1 pl-3 pr-3 rounded-md bg-indigo-100 hover:bg-indigo-200 cursor-pointer transition ease-in-out duration-200 text-sm"
              }
              key={tag}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="markdown-body" style={{ fontSize: "17px" }}>
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
          {detail}
        </ReactMarkdown>
      </div>
      <Utterances />
    </div>
  );
}

export default PostDetail;

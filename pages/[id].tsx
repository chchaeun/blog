import { useRouter } from "next/router";
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
  if (!postData) {
    return <div>존재하지 않는 게시글입니다.</div>;
  }
  return (
    <div>
      <div>{postData.title}</div>
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
  );
}

export default PostDetail;

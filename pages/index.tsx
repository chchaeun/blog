import { getAllTags, getSortedPostsData } from "../lib/posts";
import { getProfileData } from "../lib/blog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SideProfile from "../components/side-profile";
import { classNames } from "../util/class-name";
import markdownToTxt from "markdown-to-txt";
import { useRouter } from "next/router";
export interface IPostData {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  tags: string;
  date: string;
  preview: string;
}

interface ITag {
  name: string;
  count: number;
}
export interface IProfile {
  name: string;
  description: string;
  email: string;
  instagram: string;
  image: string;
  github: string;
}
interface IProps {
  allPostsData: IPostData[];
  allTags: ITag[];
  profileData: IProfile;
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allTags = getAllTags();
  const profileData = getProfileData();
  return {
    props: {
      allPostsData,
      allTags,
      profileData,
    },
  };
}
const Home = ({ allPostsData, allTags, profileData }: IProps) => {
  const router = useRouter();
  const {
    query: { tag },
  } = router;
  const getFilteredPosts = (allPostsData: IPostData[]) => {
    const tagSelect = tag && typeof tag === "string" ? tag : "전체";
    if (tagSelect === "전체") {
      return allPostsData;
    } else {
      return allPostsData.filter(
        (postData) => postData.tags.split(", ").indexOf(tagSelect) > -1
      );
    }
  };
  const onTagClick = (tagName: string) => {
    router.push(`/?tag=${tagName}`);
  };
  return (
    <div className="flex justify-around gap-10 dark:bg-[#0d1117]  dark:text-[#c9d1d9]">
      <div className="flex flex-col gap-10 w-2/3 pt-10">
        <div className="flex flex-wrap mr-10 gap-2">
          <span className="font-semibold text-lg">Tags</span>
          {allTags.map((tag: ITag) => (
            <span
              className={classNames(
                (!router.query.tag && tag.name === "전체") ||
                  router.query.tag === tag.name
                  ? "bg-indigo-200 font-medium"
                  : "bg-indigo-50 font-light",
                "p-1 pl-3 pr-3 rounded-md hover:bg-indigo-200 cursor-pointer transition ease-in-out duration-200 dark:text-black"
              )}
              key={tag.name}
              onClick={() => onTagClick(tag.name)}
            >
              {tag.name}({tag.count})
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-10 pb-20">
          {getFilteredPosts(allPostsData).map((postData: IPostData) => (
            <div key={postData.id}>
              <div className="flex gap-5">
                <div className="w-3/5 flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <Link href={`/blog/${postData.id}`}>
                      <h1 className="text-3xl hover:underline cursor-pointer">
                        {postData.title}
                      </h1>
                    </Link>
                    <div className="text-lg text-gray-500">
                      {markdownToTxt(postData.preview)}⋯
                    </div>
                  </div>
                  <div className="text-gray-500">{postData.date}</div>
                </div>
                <Image
                  src={postData.thumbnail}
                  alt="포스트 썸네일"
                  width={250}
                  height={180}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <SideProfile {...profileData} />
    </div>
  );
};

export default Home;

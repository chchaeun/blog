import React from "react";
import { getCategoryInfos } from "../../lib/category";
import Image from "next/image";
import { useRouter } from "next/router";
import { IProfile } from "..";
import { getProfileData } from "../../lib/blog";
import SideProfile from "../../components/side-profile";
export interface ICategoryInfo {
  id: string;
  name: string;
  thumbnail: string;
  numberOfPosts: number;
}
interface IProps {
  categoryInfos: ICategoryInfo[];
  profileData: IProfile;
}
export async function getStaticProps() {
  const categoryInfos = getCategoryInfos();
  const profileData = getProfileData();

  return { props: { categoryInfos, profileData } };
}

function Category({ categoryInfos, profileData }: IProps) {
  const router = useRouter();
  const onCategoryClick = (categoryId: string) => {
    router.push(`/category/${categoryId}`, `/blog/category/${categoryId}`);
  };

  return (
    <div className="flex justify-around gap-10 dark:text-[#c9d1d9]">
      <div className="flex flex-col gap-10 w-1/2 mr-20 pt-10 pb-20">
        <h1 className="text-3xl font-bold">Category</h1>
        <div className="grid grid-cols-2 gap-8">
          {categoryInfos.map((categoryInfo) => (
            <div
              className="flex flex-col gap-3 cursor-pointer hover:-translate-y-1 transition duration-150"
              key={categoryInfo.id}
              onClick={() => onCategoryClick(categoryInfo.id)}
            >
              <Image
                src={categoryInfo.thumbnail}
                width={250}
                height={300}
                alt="카테고리 썸네일"
                className="object-cover"
              />
              <div className="text-lg font-semibold pl-2 pt-4">
                {categoryInfo.name}
              </div>
              <div className="text-base pl-2 pb-4 text-gray-600 dark:text-gray-400">
                {categoryInfo.numberOfPosts}개의 포스트
              </div>
            </div>
          ))}
        </div>
      </div>
      <SideProfile {...profileData} />
    </div>
  );
}

export default Category;

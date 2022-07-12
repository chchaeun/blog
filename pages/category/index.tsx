import React from "react";
import { getCategoryInfos } from "../../lib/category";
import Image from "next/image";
import { useRouter } from "next/router";
export interface ICategoryInfo {
  id: string;
  name: string;
  thumbnail: string;
}
interface IProps {
  categoryInfos: ICategoryInfo[];
}
export async function getStaticProps() {
  const categoryInfos = getCategoryInfos();
  return { props: { categoryInfos } };
}

function Category({ categoryInfos }: IProps) {
  const router = useRouter();
  const onCategoryClick = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };
  return (
    <div className="flex flex-col gap-10 m-auto w-2/3 pt-10 pb-20">
      <h1 className="text-4xl font-bold">카테고리</h1>
      <div className="grid grid-cols-2 gap-8">
        {categoryInfos.map((categoryInfo) => (
          <div
            className="flex flex-col gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition duration-150"
            key={categoryInfo.id}
            onClick={() => onCategoryClick(categoryInfo.id)}
          >
            <Image
              src={categoryInfo.thumbnail}
              width={400}
              height={300}
              alt="카테고리 썸네일"
            />
            <div className="text-xl font-semibold pl-2 p-4">
              {categoryInfo.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;

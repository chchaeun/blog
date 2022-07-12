import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "_posts");
const categoryNames = fs.readdirSync(postsDirectory);

export function getCategoryInfos() {
  const categoryInfos = categoryNames.map((categoryName) => {
    const categoryInfo = fs.readFileSync(
      path.join(postsDirectory, categoryName, "_info.md"),
      "utf8"
    );
    return matter(categoryInfo).data;
  });
  return categoryInfos;
}

export function getCategoryInfoById(categoryId) {
  const categoryInfos = getCategoryInfos();
  const categoryInfo = categoryInfos.find(
    (categoryInfo) => categoryInfo.id === categoryId
  );
  return categoryInfo;
}

export function getPostsByCategoryId(categoryId) {
  const postNames = fs.readdirSync(path.join(postsDirectory, categoryId));
  const postDatas = postNames.slice(1).map((postName) => {
    const postData = fs.readFileSync(
      path.join(postsDirectory, categoryId, postName)
    );
    const id = postName.replace(/\.md$/, "");
    const matterResult = matter(postData);
    return {
      id,
      ...matterResult.data,
      preview: matterResult.content.slice(0, 140),
    };
  });
  return postDatas.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

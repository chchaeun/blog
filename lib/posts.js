import fs from "fs";
import path from "path";
import matter from "gray-matter";
import markdownToTxt from "markdown-to-txt";

const postsDirectory = path.join(process.cwd(), "_posts");
const categoryNames = fs.readdirSync(postsDirectory);

export function getSortedPostsData() {
  let allPostData = [];
  categoryNames.map((categoryName) => {
    const fileNames = fs.readdirSync(path.join(postsDirectory, categoryName));
    const postData = fileNames.slice(1).map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, categoryName, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      const removeImageLink = (content) => {
        return content.replace("![image]", "[ ]");
      };

      return {
        id,
        ...matterResult.data,
        preview: markdownToTxt(removeImageLink(matterResult.content)).slice(
          0,
          140
        ),
      };
    });
    allPostData = allPostData.concat(postData);
  });
  return allPostData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getPostDataById(id) {
  const allPostData = getSortedPostsData();
  const postData = allPostData.find((data) => data.id === id);
  return postData;
}

export function getPostDetailById(id) {
  let allPostsData = [];
  categoryNames.map((categoryName) => {
    const fileNames = fs.readdirSync(path.join(postsDirectory, categoryName));
    const postData = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, categoryName, fileName);

      return {
        id,
        fullPath,
      };
    });
    allPostsData = allPostsData.concat(postData);
  });
  const fullPathById = allPostsData.find(
    (postData) => postData.id === id
  ).fullPath;
  const fileContents = fs.readFileSync(fullPathById, "utf8");
  const matterResult = matter(fileContents);
  return matterResult.content;
}

export function getAllTags() {
  const allPostData = getSortedPostsData();
  let allTag = [];
  allPostData.map((postData) => {
    const tagArr = postData.tags && postData.tags.split(", ");
    allTag = allTag.concat(tagArr);
  });
  allTag = allTag.reduce((prev, cur) => {
    prev[cur] = ++prev[cur] || 1;
    return prev;
  }, {});
  let result = [{ name: "전체", count: allPostData.length }];
  for (const [key, value] of Object.entries(allTag)) {
    result.push({ name: key, count: value });
  }

  return result.sort(({ count: a }, { count: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

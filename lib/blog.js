import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getProfileData() {
  const profilePath = path.join(process.cwd(), "_blog/profile.md");
  const profileData = fs.readFileSync(profilePath, "utf8");
  const matterResult = matter(profileData);
  return { ...matterResult.data };
}

import React from "react";
import Image from "next/image";
import { IProfile } from "../pages";
import { AiFillGithub } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
function SideProfile(props: IProfile) {
  const { name, description, email, github, instagram, image } = props;
  return (
    <div className="p-10 fixed top-50 right-0 h-full ">
      <Image
        className="rounded-full"
        src="https://avatars.githubusercontent.com/u/85024598?v=4"
        width={200}
        height={200}
        alt="프로필 사진"
      />
      <div className="flex flex-col gap-2 mt-5">
        <span className="text-2xl mr-2">{name}</span>
        <div className="text-lg">{description}</div>
        <hr />
        <div className="flex gap-2">
          <a
            href={`https://github.com/${github}`}
            className="hover:underline hover:text-indigo-400"
          >
            <AiFillGithub size={35} />
          </a>
          <a
            href={`mailto:${email}`}
            className="hover:underline hover:text-indigo-400"
          >
            <MdEmail size={35} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SideProfile;

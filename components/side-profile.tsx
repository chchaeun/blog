import React from "react";
import Image from "next/image";
import { IProfile } from "../pages";
import { AiFillGithub } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

function SideProfile(props: IProfile) {
  const { name, description, email, github, image } = props;
  return (
    <div className="p-10 fixed top-50 right-0 h-full w-1/5 dark:text-[#c9d1d9]">
      <Image
        className="rounded-full w-full object-cover"
        src={image}
        width={160}
        height={160}
        alt="프로필 사진"
      />
      <div className="flex flex-col gap-2 mt-5">
        <span className="text-xl mr-2">{name}</span>
        <div className="text-sm">{description}</div>
        <hr />
        <div className="flex gap-2">
          <a
            href={`https://github.com/${github}`}
            className="hover:underline hover:text-indigo-400"
          >
            <AiFillGithub size={27} />
          </a>
          <a
            href={`mailto:${email}`}
            className="hover:underline hover:text-indigo-400"
          >
            <MdEmail size={27} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SideProfile;

import React from "react";
import Image from "next/image";
import { IProfile } from "../pages";
import { AiFillGithub } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

function SideProfile(props: IProfile) {
  const { name, description, email, github, image } = props;
  return (
    <div className="p-10 lg:fixed lg:top-50 lg:right-0 lg:h-full lg:w-1/5 dark:text-[#c9d1d9] sm:flex sm:gap-4">
      <div className="sm:w-20 sm:h-20 sm:m-auto">
        <Image
          className="rounded-full lg:w-full object-cover"
          src={image}
          width={180}
          height={180}
          alt="프로필 사진"
        />
      </div>
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

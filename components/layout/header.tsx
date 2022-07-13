import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { classNames } from "../../util/class-name";

const headerData = {
  icon: "https://velog.velcdn.com/images/chchaeun/profile/01725b7d-94eb-4baa-a83d-753405c4d646/social.png",
  blog_name: "개발새발",
};

function Header() {
  const router = useRouter();

  return (
    <nav className="flex bg-white sticky top-0 left-0 z-50 justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10 pr-10 pl-10 dark:bg-[#0d1117] dark:text-[#c9d1d9] dark:border-gray-600">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src={headerData.icon}
              width={50}
              height={50}
              alt="블로그 아이콘"
            />
            <h1 className="text-2xl ">{headerData.blog_name}</h1>
          </div>
        </Link>
      </div>
      <div className="flex justify-between gap-10">
        <Link href="/">
          <button
            className={classNames(
              router.pathname === "/" ? "font-bold " : "font-light",
              "hover:text-indigo-300 text-xl"
            )}
          >
            Home
          </button>
        </Link>
        <Link href="/category">
          <button
            className={classNames(
              router.pathname === "/category" ||
                router.pathname === "/category/[cid]"
                ? "font-bold "
                : "font-light",
              "hover:text-indigo-300 text-xl"
            )}
          >
            Category
          </button>
        </Link>
        <Link href="/about">
          <button
            className={classNames(
              router.pathname === "/about" ? "font-bold " : "font-light",
              "hover:text-indigo-300 text-xl"
            )}
          >
            About
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;

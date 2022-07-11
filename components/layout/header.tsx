import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { classNames } from "../../util/class-name";
function Header() {
  const router = useRouter();

  return (
    <nav className="flex bg-white sticky top-0 left-0 z-50 justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10 pr-10 pl-10">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="https://velog.velcdn.com/images/chchaeun/profile/01725b7d-94eb-4baa-a83d-753405c4d646/social.png"
              width={50}
              height={50}
              alt="블로그 아이콘"
            />
            <h1 className="text-xl ">개발새발</h1>
          </div>
        </Link>
      </div>
      <div className="flex justify-between gap-10">
        <Link href="/">
          <button
            className={classNames(
              router.pathname === "/" ? "font-bold" : "font-normal"
            )}
          >
            Home
          </button>
        </Link>
        <Link href="/category">
          <button
            className={classNames(
              router.pathname === "/category" ? "font-bold" : "font-normal"
            )}
          >
            Category
          </button>
        </Link>
        <Link href="/about">
          <button
            className={classNames(
              router.pathname === "/about" ? "font-bold" : "font-normal"
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

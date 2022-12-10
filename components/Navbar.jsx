import Image from "next/image";
import React, { useState } from "react";
import logo from "../public/logo.png";
import { MdSearch } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  const [placeholder, setPlaceholder] = useState("Search Album/Artist/Song");
  const menu = [
    { id: 1, title: "Overview", link: "/" },
    { id: 2, title: "Popular", link: "/popular" },
    { id: 3, title: "Trending", link: "/trending" },
    { id: 4, title: "Charts", link: "/charts" },
    { id: 5, title: "New Releases", link: "/newreleases" },
    { id: 6, title: "Genres", link: "/genres" },
  ];

  const handleChange = (e) => {};
  const handleSearch = () => {
    // trigger search
  };
  const handleFocus = (e) => {
    setPlaceholder("");
  };
  const handleBlur = (e) => {
    setPlaceholder("search album/artist/song");
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
       router.push('/search')
    }
  };
  return (
    <div className=" w-full h-[80px] px-2 absolute ">
      <div className="flex justify-between">
        <Image
          className="hidden sm:block sm:rounded-[50%] h-[80px] w-[80px] cursor-pointer md:h-[100px] md:w-[100px] hover:scale-105 duration-500"
          src={logo}
          alt="logo"
          onClick={() => router.push("/")}
        />
        <div className="w-full sm:w-auto flex justify-center items-center ">
          <input
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={onKeyPress}
            onChange={handleChange}
            className=" rounded-xl w-1/2 bg-base focus:bg-[#d1cece] p-1 sm:rounded-3xl sm:min-w-[300px] focus:shadow-inner text-center text-sm sm:py-2 font-extrabold text-[white]"
            type="text"
            placeholder={placeholder}
          />
          <div
            className="hidden relative ml-1 sm:block cursor-pointer"
            onClick={handleSearch}>
            <MdSearch size={20} />
          </div>
        </div>
        <ul className="hidden md:flex justify-evenly items-center space-x-4 uppercase text-primary text-bold text-sm whitespace-nowrap">
          {menu.map(({ title, link, id }) => (
            <Link
              className="hover:border-b-2 border-b-secondary"
              key={id}
              href={link}>
              {title}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

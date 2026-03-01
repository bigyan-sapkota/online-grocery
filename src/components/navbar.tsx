import { IoIosSearch } from "react-icons/io";
import { FaListUl, FaRegUser } from "react-icons/fa";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";

export default function Navbar() {
  const [isNavMenuVisible, setIsNavMenuVisible] = useState<boolean>(false);

  const navClickHanlder = () => {
    setIsNavMenuVisible((prev) => !prev);
  };

  return (
    <nav className="max-w-[1440px] mx-auto flex items-center justify-between mt-4 md:mt-6 px-4 relative">
      <h1 className="text-primary text-xl font-bold md:text-2xl lg:text-4xl">
        Online Grocery
      </h1>

      <button
        className="size-10 p-2 bg-primary text-white rounded-full hover:cursor-pointer hover:bg-white hover:text-primary border-2 border-primary transition-colors duration-300 flex items-center justify-center lg:hidden"
        onClick={navClickHanlder}
      >
        {isNavMenuVisible ? (
          <IoClose className="size-6" />
        ) : (
          <RiMenu3Line className="size-6" />
        )}
      </button>

      {isNavMenuVisible && (
        <div className="border absolute top-10 w-4/5 left-1/2 -translate-x-1/2 shadow-lg bg-white bg-orange h-fit p-4 space-y-4 flex flex-col items-center">
          <SearchBox />
          <SignInCartButtons />
        </div>
      )}

      <div className="hidden lg:flex gap-40">
        <SearchBox />
        <SignInCartButtons />
      </div>
    </nav>
  );
}

function SearchBox() {
  return (
    <div className="flex w-full lg:w-[507px] bg-primary/10 items-center justify-between p-3 rounded-2xl">
      <div className="flex items-center">
        <IoIosSearch className="text-primary size-5" />
        <input
          type="text"
          placeholder="Search essential groceries and more..."
          className="placeholder:text-primary-text w-72 outline-none pl-2.5"
        />
      </div>
      <FaListUl className="text-primary size-5" />
    </div>
  );
}

function SignInCartButtons() {
  return (
    <div className="flex items-center gap-5">
      <p className="flex items-center gap-2 font-semibold">
        <FaRegUser className="size-4" />
        Sign In
      </p>
      <div className="h-5 w-0.5 bg-primary-text"></div>
      <p className="flex items-center gap-2 font-semibold">
        <IoCartOutline className="size-5" />
        Cart
      </p>
    </div>
  );
}

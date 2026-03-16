import { IoIosSearch } from "react-icons/io";
import { FaListUl, FaRegUser } from "react-icons/fa";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { useState, type Dispatch, type SetStateAction } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isNavMenuVisible, setIsNavMenuVisible] = useState<boolean>(false);

  const navClickHanlder = () => {
    setIsNavMenuVisible((prev) => !prev);
  };

  return (
    <header className="relative mx-auto mt-4 flex max-w-[1440px] items-center justify-between px-4 md:mt-6 lg:h-12">
      <h1 className="text-primary text-xl font-bold md:text-2xl lg:text-4xl">
        Online Grocery
      </h1>

      <div className="hidden lg:block">
        <Navigation />
      </div>

      <button
        className="bg-primary hover:text-primary border-primary flex size-10 items-center justify-center rounded-full border-2 p-2 text-white transition-colors duration-300 hover:cursor-pointer hover:bg-white lg:hidden"
        onClick={navClickHanlder}
      >
        {isNavMenuVisible ? (
          <IoClose className="size-6" />
        ) : (
          <RiMenu3Line className="size-6" />
        )}
      </button>

      {isNavMenuVisible && (
        <div className="bg-orange absolute top-10 left-1/2 flex h-fit w-4/5 -translate-x-1/2 flex-col items-center space-y-4 border bg-white p-4 shadow-lg">
          <SearchBox />
          <Navigation setIsNavMenuVisible={setIsNavMenuVisible} />
          <SignInButton />
        </div>
      )}

      <div className="hidden gap-40 lg:flex">
        <SearchBox />
        <SignInButton />
      </div>
    </header>
  );
}

type NavigationProps = {
  setIsNavMenuVisible?: Dispatch<SetStateAction<boolean>>;
};

function Navigation({ setIsNavMenuVisible }: NavigationProps) {
  const { pathname } = useLocation();

  const navs = [
    { id: 1, text: "Products", href: "/products" },
    { id: 2, text: "About", href: "/about-us" },
  ];

  const handleNavClick = () => {
    setIsNavMenuVisible?.(false);
  };

  return (
    <nav className="flex h-full w-full flex-col items-center gap-4 lg:flex-row lg:gap-10">
      {navs.map((item) => (
        <Link
          key={item.id}
          to={item.href}
          onClick={handleNavClick}
          className={cn(
            "rounded-lg py-1.5 lg:rounded-none lg:py-0 lg:text-lg lg:font-medium",
            item.href === pathname &&
              "bg-primary lg:text-primary w-full text-center text-white lg:bg-transparent",
          )}
        >
          {item.text}
        </Link>
      ))}
    </nav>
  );
}

function SearchBox() {
  return (
    <div className="bg-primary/10 flex w-full items-center justify-between rounded-2xl p-3 lg:w-[507px]">
      <div className="flex items-center">
        <IoIosSearch className="text-primary size-5" />
        <input
          type="text"
          placeholder="Search grocery..."
          className="placeholder:text-primary-text w-72 pl-2.5 outline-none"
        />
      </div>
      <FaListUl className="text-primary size-5" />
    </div>
  );
}

function SignInButton() {
  return (
    <Button variant="ghost">
      <FaRegUser className="size-4" />
      Sign In
    </Button>
  );
}

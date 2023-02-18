import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { boolean } from "zod";
import { useDebounce } from "../utils/debounce";
import { trpc } from "../utils/trpc";
import { MiniLoader } from "./MiniLoader";
import Sidebar from "./Sidebar";
// import Link from "next/link";
// import React from "react";

const Navbar: React.FC = () => {
  const router = useRouter();
  // const searchBox = useRef(false);
  const [searchData, setSearchData] = useState("");

  const debouncedFilter = useDebounce(searchData, 1000);
  const { data: sessionData, status } = useSession();
  const { data, isFetched, isFetching } = trpc.search.searchField.useQuery(
    { searchTerm: debouncedFilter },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: Boolean(debouncedFilter) && debouncedFilter.length > 3,
      onSuccess: (success) => console.log("response", success),
    }
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar sticky top-0 z-50 w-[100vw] bg-gray-900">
      <div className="navbar-start">
        <div className="dropdown">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <label className="swap-rotate swap btn-md btn-circle btn mr-2 bg-inherit text-white hover:bg-gray-600 lg:hidden">
            <input
              type="checkbox"
              className="hidden"
              checked={isOpen}
              onChange={() => setIsOpen(!isOpen)}
            />
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </div>
        <div
          className="flex cursor-pointer items-center"
          onClick={() => router.push("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="h-6 w-6 text-green-500 md:mx-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <h2 className="ml-1 cursor-pointer text-white sm:flex md:text-2xl">
            SupaCode
          </h2>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>{sessionData && <Link href="/create-post">Write Here!</Link>}</li>
          {/* <li tabIndex={0}>
            <a>
              Parent
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="bg-gray-900 p-2">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li> */}
        </ul>
      </div>
      <div className="navbar-end flex gap-4">
        <div className="form-control relative hidden items-center md:flex">
          <label className="hidden" htmlFor="searchInput" id="searchLabel">
            Search
          </label>
          {/* <input
            type="text"
            placeholder="Search"
            className="dropdown input-bordered input input-sm w-full max-w-xs"
            aria-labelledby="search"
            aria-autocomplete="list"
          /> */}
          <input
            id="top-nav-search-input"
            aria-autocomplete="list"
            aria-controls="top-nav-search-menu"
            aria-labelledby="top-nav-search-label"
            autoComplete="off"
            type="search"
            className="input-bordered input input-sm w-full max-w-xs"
            name="q"
            onChange={(e) => setSearchData(e.target.value)}
          ></input>
          {/* <button
            className="btn-sm btn normal-case hover:bg-yellow-100"
            onClick={async () => {
              console.log("serach", searchData);
              await refetch().then((res) => console.log("res", res.data));
            }}
          >
            Search
          </button> */}
          {isFetching && (
            <div
              id="top-nav-search-menu"
              role="listbox"
              aria-labelledby="top-nav-search-label"
              className="absolute mt-10 w-full p-0.5"
            >
              <div className="search-results cursor-pointer">
                <div
                  role="option"
                  aria-selected="false"
                  id="top-nav-search-item-0"
                  className="result-item  flex flex-col items-center rounded-md bg-gray-100 p-1 text-black"
                >
                  <MiniLoader />
                </div>
              </div>
            </div>
          )}
          {isFetched && (
            <div
              id="top-nav-search-menu"
              role="listbox"
              aria-labelledby="top-nav-search-label"
              className="absolute mt-10 w-full p-0.5"
            >
              {data.map((item, index) => (
                <div className="search-results cursor-pointer " key={index}>
                  <div
                    role="option"
                    aria-selected="false"
                    id="top-nav-search-item-0"
                    className="result-item  flex flex-col items-center  bg-gray-100 p-1 text-black hover:bg-gray-200"
                  >
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {status === "unauthenticated" && (
          <button
            className="btn-sm btn bg-white text-black hover:bg-green-600 hover:text-white"
            onClick={() => signIn()}
          >
            Sign Up / Login
          </button>
        )}
        {status === "authenticated" && (
          <div className="dropdown-end dropdown">
            <label
              tabIndex={0}
              className="placeholder btn-sm btn-circle avatar btn"
            >
              <div className="w-16 rounded-full bg-white text-neutral-content">
                <span className="text-lg">J</span>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box mt-4 w-52 bg-white text-black shadow"
            >
              <li className="hover:bg-gray-900 hover:text-white ">
                <button onClick={() => router.push("/user")}>Profile</button>
              </li>
              <li className="hover:bg-gray-900 hover:text-white">
                <button
                  onClick={() => {
                    signOut();
                    router.push("/");
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
        {status === "loading" && (
          <div className="placeholder btn-sm btn-circle avatar btn">
            <div className="w-16 rounded-full bg-white text-neutral-content">
              <span className="text-lg"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

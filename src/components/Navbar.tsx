import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
// import Link from "next/link";
// import React from "react";

const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();
  //   return (
  //     <header className="body-font  fixed top-0 z-50 w-full bg-gray-900 text-gray-400">
  //       <div className="container absolute mx-auto flex h-20  flex-col flex-wrap p-5 md:static md:flex-row">
  //         <a className="title-font mb-3 flex items-center font-medium text-white md:mb-0">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             className="h-10 w-10 rounded-full bg-green-500 p-2 text-white"
  //             viewBox="0 0 24 24"
  //           >
  //             <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  //           </svg>

  //           <span className="ml-3 text-xl">SupaCode!</span>
  //         </a>
  //         <nav className="flex flex-col space-x-2 text-base md:ml-auto md:mr-auto md:flex-row md:items-center md:justify-center">
  //           <Link
  //             className="my-2 mr-5 cursor-pointer hover:text-green-500"
  //             href="/posts"
  //           >
  //             Posts
  //           </Link>
  //           <Link
  //             className="my-2 mr-5 cursor-pointer hover:text-green-500"
  //             href="/posts"
  //           >
  //             Filler
  //           </Link>
  //         </nav>
  //         <button
  //           onClick={sessionData ? () => signOut() : () => signIn()}
  //           className=" mt-4 inline-flex items-center rounded border-0 bg-gray-800 py-1 px-3 text-base hover:bg-gray-700 focus:outline-none md:mt-0"
  //         >
  //           {sessionData ? "Log Out" : "Log In"}
  //           <svg
  //             fill="none"
  //             stroke="currentColor"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             className="ml-1 h-4 w-4"
  //             viewBox="0 0 24 24"
  //           >
  //             <path d="M5 12h14M12 5l7 7-7 7"></path>
  //           </svg>
  //         </button>
  //       </div>
  //     </header>
  //   );
  // };

  // export default Navbar;

  // export default function Navbar() {
  // const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <div className="navbar fixed top-0 z-50 bg-gray-900">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <a className="justify-between">
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="h-6 w-6 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
        <h2 className="ml-2 text-lg">SupaCode</h2>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
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
            <ul className="p-2">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input-bordered input input-sm w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

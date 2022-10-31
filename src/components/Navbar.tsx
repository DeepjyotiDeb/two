// import { signIn, signOut, useSession } from "next-auth/react";
// import Link from "next/link";
// import React from "react";

// const Navbar: React.FC = () => {
//   const { data: sessionData } = useSession();
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
import React from "react";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="fixed top-0 flex  w-full flex-wrap items-center justify-between bg-gray-900 px-2 py-2">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div className="relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start">
            <a
              className="mr-4 flex items-center whitespace-nowrap py-2 font-bold leading-relaxed text-white"
              href="#pablo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-10 w-10 rounded-full bg-green-500 p-2 text-white"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">SupaCode!</span>
            </a>
            <button
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-white outline-none hover:bg-gray-500 focus:outline-none lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div
            className={
              "flex-grow items-center lg:flex" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex list-none flex-col ease-in lg:ml-auto lg:flex-row">
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-facebook-square leading-lg text-lg text-white opacity-75"></i>
                  <span className="ml-2">Share</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-twitter leading-lg text-lg text-white opacity-75"></i>
                  <span className="ml-2">Tweet</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-pinterest leading-lg text-lg text-white opacity-75"></i>
                  <span className="ml-2">Pin</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

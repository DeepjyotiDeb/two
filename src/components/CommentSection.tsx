import Image from "next/image";
import React from "react";
// import { User, Comments, CommentThread } from "../types/comment";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CommentSection = () =>
  // props: {
  // comments: any;
  // commentThread: any;
  // userData: any;
  // }
  //  {
  //   comments: Comments[];
  //   commentThread: CommentThread[];
  //   userData: User;
  // }
  {
    return (
      <div className="mt-10">
        <div className="mx-auto w-full flex-col  border-t-2 py-4  sm:px-4  sm:py-4 md:px-4">
          <div className="flex flex-row">
            <div className="relative h-12 w-12 rounded-full border-2 border-gray-300 object-cover">
              <Image
                layout="fill"
                // height={12}
                // width={12}
                className="rounded-full border-2 border-gray-300 object-cover"
                alt="Noob master's avatar"
                src="https://dummyimage.com/200x200"
              />
            </div>
            <div className="mt-1 flex-col">
              <div className="flex flex-1 items-center px-4 font-bold leading-tight">
                Noob master
                <span className="ml-2 text-xs font-normal text-gray-500">
                  2 weeks ago
                </span>
              </div>
              <div className="ml-2 flex-1 px-2 text-sm font-medium leading-loose text-white">
                Wow!!! how you did you create this?
              </div>
              <button className="flex-column ml-1 inline-flex items-center px-1 pt-2">
                <svg
                  className="ml-2 h-5 w-5 cursor-pointer fill-current text-gray-600 hover:text-gray-900"
                  viewBox="0 0 95 78"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                    fillRule="nonzero"
                  />
                </svg>
              </button>
              <button className="flex-column -ml-1 inline-flex items-center px-1">
                <svg
                  className="h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <hr className="my-2 ml-16 border-gray-200" />
          <div className="md-10 flex flex-row pt-1 md:ml-16">
            <div className="relative h-12 w-12 rounded-full border-2 border-gray-300 object-cover">
              <Image
                layout="fill"
                // height={12}
                // width={12}
                className="rounded-full border-2 border-gray-300 object-cover"
                alt="Emily's avatar"
                src="https://dummyimage.com/300x300"
              />
            </div>
            <div className="mt-1 flex-col">
              <div className="flex flex-1 items-center px-4 font-bold leading-tight">
                Emily
                <span className="ml-2 text-xs font-normal text-gray-500">
                  5 days ago
                </span>
              </div>
              <div className="ml-2 flex-1 px-2 text-sm font-medium leading-loose text-white">
                I created it using TailwindCSS
              </div>
              <button className="flex-column ml-1 inline-flex items-center px-1 pt-2">
                <svg
                  className="ml-2 h-5 w-5 cursor-pointer fill-current text-gray-600 hover:text-gray-900"
                  viewBox="0 0 95 78"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                    fillRule="nonzero"
                  />
                </svg>
              </button>
              <button className="flex-column -ml-1 inline-flex items-center px-1">
                <svg
                  className="h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default CommentSection;

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import CommentSection from "./CommentSection";
import LoadingSpinner from "./LoadingSpinner";

const Post: React.FC = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const id = router.query.id as string;
  const { data, isLoading } = trpc.post.getSinglePost.useQuery(
    { id: id },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: router.isReady,
      onSuccess: (success) => console.log("success", success, sessionData),
    }
  );

  const [comment, setComment] = useState("");

  const { mutateAsync: postNewComment } =
    trpc.comment.postComment.useMutation();
  const { mutateAsync: postThreadComment } =
    trpc.comment.threadComment.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("data", data);
    e.preventDefault();
    if (sessionData?.user?.id) {
      try {
        const res = await postNewComment({
          comment: comment,
          postId: id,
          userId: sessionData.user.id,
        });
        console.log("res", res);
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const threadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionData?.user?.id) {
      try {
        const res = await postThreadComment({
          //636016b6220489f11d693ad5
          comment: comment,
          postId: id,
          userId: sessionData.user.id,
          parentCommentId: "636016b6220489f11d693ad5",
        });
        console.log("res thread comment", res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="body-font bg-gray-800 text-gray-400">
      <div className="container mx-auto flex flex-col px-5 py-24">
        <div className="mx-auto lg:w-4/6">
          {/* <div className="h-64 overflow-hidden rounded-lg"> */}
          {/* <img alt="content" className="object-cover object-center h-full w-full" src="https://dummyimage.com/1200x500"> */}
          {/* </div> */}
          <div className="mt-1 flex flex-col items-center">
            <div className="text-center  lg:py-8 lg:pr-8">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 text-gray-600">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="title-font mt-4 text-lg font-medium text-white">
                  Phoebe Caulfield
                </h2>
                <div className="mt-2 mb-4 h-1 w-12 rounded bg-green-500"></div>
                <p className="text-base text-gray-400">
                  Raclette knausgaard hella meggs normcore williamsburg enamel
                  pin sartorial venmo tbh hot chicken gentrify portland.
                </p>
              </div>
            </div>
            <div className="mt-4 border-t border-gray-800 pt-4 text-center sm:mt-0  sm:border-l sm:border-t-0 sm:py-8 sm:pl-8 sm:text-left">
              <p className="mb-4 text-lg leading-relaxed">
                Meggings portland fingerstache lyft, post-ironic fixie man bun
                banh mi umami everyday carry hexagon locavore direct trade art
                party. Locavore small batch listicle gastropub farm-to-table
                lumbersexual salvia messenger bag. Coloring book flannel
                truffaut craft beer drinking vinegar sartorial, disrupt fashion
                axe normcore meh butcher. Portland 90s scenester vexillologist
                forage post-ironic asymmetrical, chartreuse disrupt butcher
                paleo intelligentsia pabst before they sold out four loko. 3
                wolf moon brooklyn.
              </p>
              <a className="inline-flex items-center text-green-400">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="ml-2 h-4 w-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        {data && sessionData && (
          <CommentSection
            userData={sessionData.user}
            comments={data.comments}
            commentThread={data.commentThread}
          />
        )}
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full flex-col py-4  sm:rounded-lg sm:px-4 sm:py-4 md:w-2/3  md:px-4"
        >
          <textarea
            rows={4}
            className="w-full"
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-center space-x-2">
            <button
              className="inline-block rounded bg-green-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
              type="submit"
            >
              Post Comment
            </button>
            <button
              className="inline-block rounded bg-green-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
              onClick={threadSubmit}
            >
              Post Comment thread
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Post;

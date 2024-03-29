import { InferGetStaticPropsType } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { getStaticProps } from "../pages/[id]";
// import { getStaticProps } from "../pages/[id]";
import { trpc } from "../utils/trpc";
import CommentSection from "./CommentSection";
// import LoadingSpinner from "./LoadingSpinner";
import { PlaceholderText } from "./placeholder";
import DOMPurify from "isomorphic-dompurify";

const Post = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const Post = () => {
  const { id: testId } = props;
  // //console.log("id test", testId);
  const router = useRouter();
  const { data: sessionData } = useSession();
  // const id = router.query.id as string;
  const { data, isLoading } = trpc.post.getSinglePost.useQuery(
    { id: testId },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: router.isReady,
      // onSuccess: (success) => //console.log("success", success, sessionData),
      onError: (error) => {
        console.log("error", error);
        router.push("/");
      },
    }
  );

  // const [comment, setComment] = useState("");

  // const { mutateAsync: postNewComment } =
  //   trpc.comment.postComment.useMutation();
  // const { mutateAsync: postThreadComment } =
  //   trpc.comment.threadComment.useMutation();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   //console.log("data", data);
  //   e.preventDefault();
  //   if (sessionData?.user?.id) {
  //     try {
  //       await postNewComment({
  //         comment: comment,
  //         // postId: id,
  //         postId: testId,
  //         userId: sessionData.user.id,
  //       });
  //       //console.log("res", res);
  //     } catch (error) {
  //       //console.log("error", error);
  //     }
  //   }
  // };
  // const threadSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (sessionData?.user?.id) {
  //     try {
  //       await postThreadComment({
  //         //636016b6220489f11d693ad5
  //         comment: comment,
  //         // postId: id,
  //         postId: testId,
  //         userId: sessionData.user.id,
  //         parentCommentId: "636016b6220489f11d693ad5",
  //       });
  //       //console.log("res thread comment", res);
  //     } catch (error) {
  //       //console.log(error);
  //     }
  //   }
  // };

  // if (isLoading) {
  //   return (
  //     <div role="status" className="max-w-sm animate-pulse">
  //       <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
  //       <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
  //       <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
  //       <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
  //       <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
  //       <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
  //       <span className="sr-only">Loading...</span>
  //     </div>
  //   );
  // }
  if (router.isFallback) {
    //console.log("router", router.isFallback);
    return <div>Loading...</div>;
  }
  const purifiedData = (htmlData: string) => {
    const clean = DOMPurify.sanitize(htmlData);
    return clean;
  };

  // const myLoader = ({ src, width, quality }) => {
  //   return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
  // };
  return (
    <section className="body-font flex w-full flex-col bg-gradient-to-b from-gray-500 to-gray-900 md:flex-row">
      <div className="card md:w-3/4 md:p-8 md:pr-0">
        <div className="card-body flex w-full flex-col justify-center  bg-base-100 shadow-xl md:rounded-xl">
          <div className="h-96 w-full bg-[url('../../public/random.jpeg')]"></div>
          {data && <h1 className="text-center text-6xl">{data.title}</h1>}
          {data && (
            <div
              className="mt-10"
              dangerouslySetInnerHTML={{
                __html: purifiedData(data.body),
              }}
            ></div>
          )}
          {isLoading && <PlaceholderText />}
          {sessionData && data && (
            <CommentSection
            // userData={sessionData.user}
            // comments={data.comments}
            // commentThread={data.commentThread}
            />
          )}
        </div>
      </div>
      <div className="divider divider-vertical md:divider-horizontal" />
      <div className="w-full px-4 md:mx-auto md:flex md:w-1/4 md:px-5 md:py-8 md:pl-0">
        <div className="card w-full">
          <div className="card-body rounded-xl bg-base-100 shadow-xl">text</div>
        </div>
      </div>
    </section>
  );
};

export default Post;

// {
//   data && sessionData && (
//     <CommentSection
//       userData={sessionData.user}
//       comments={data.comments}
//       commentThread={data.commentThread}
//     />
//   );
// }
// <form
//   onSubmit={handleSubmit}
//   className="mx-auto w-full flex-col py-4  sm:rounded-lg sm:px-4 sm:py-4 md:w-2/3  md:px-4"
// >
//   <textarea
//     rows={4}
//     className="w-full"
//     onChange={(e) => setComment(e.target.value)}
//   />
//   <div className="flex justify-center space-x-2">
//     <button
//       className="inline-block rounded bg-green-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
//       type="submit"
//     >
//       Post Comment
//     </button>
//     <button
//       className="inline-block rounded bg-green-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
//       onClick={threadSubmit}
//     >
//       Post Comment thread
//     </button>
//   </div>
// </form>;

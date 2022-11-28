import { NextPage } from "next";
import Posts from "../components/posts";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../server/trpc/router/_app";

const PostsPage: NextPage = () => {
  return <Posts />;
};

export default PostsPage;

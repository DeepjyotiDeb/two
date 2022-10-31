import { NextPage } from "next";
import React from "react";
import CreatePost from "../components/createPost";
import { requireAuth } from "../server/common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const CreatePostPage: NextPage = () => {
  return <CreatePost />;
};

export default CreatePostPage;

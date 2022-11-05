import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { requireAuth } from "../server/common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const CreatePost = dynamic(import("../components/createPost"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const CreatePostPage: NextPage = () => {
  return <CreatePost />;
};

export default CreatePostPage;

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  // NextPage,
} from "next";
import Post from "../../components/post";
import { appRouter } from "../../server/trpc/router/_app";
import { prisma } from "../../server/db/client";
import SuperJSON from "superjson";
import { createContextInner } from "../../server/trpc/context";

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner(),
    transformer: SuperJSON, // optional - adds superjson serialization
  });
  const id = context.params?.id as string;
  // prefetch `post.byId`
  await ssg.post.getSinglePost.prefetch({ id });
  console.log("static props", id);
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 60 * 60 * 6,
  };
}
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });
  console.log("paths", posts);
  return {
    paths: posts?.map((post) => ({
      params: {
        id: post.id,
      },
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: "blocking",
  };
};

const PostPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Post {...props} />;
};
// const PostPage = () => {
//   return <Post />;
// };

export default PostPage;

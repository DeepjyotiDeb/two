import { NextPage } from "next";
import User from "../components/Profile";
import { requireAuth } from "../server/common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const UserPage: NextPage = () => {
  return <User />;
};

export default UserPage;

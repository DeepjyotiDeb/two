import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOpen }: IProps) => {
  const router = useRouter();
  const { data } = useSession();

  return (
    <div>
      <label
        // className={`drawer-overlay ${
        //   isOpen ? "translate-x-0" : "-translate-x-full"
        // } duration-300 ease-in-out`}
        className={`${
          isOpen === true ? "drawer-overlay" : "drawer-offlay"
        } animate-fade-in-down`}
        onClick={() => setIsOpen(false)}
      ></label>
      <div
        className={`fixed top-0 left-0 h-full w-[60vw] bg-black py-20 md:w-[35vw]  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } duration-300 ease-in-out`}
      >
        {data && (
          <button
            className=" btn-outline mt-2 w-full rounded-full bg-black p-1 text-2xl hover:bg-white"
            onClick={() => {
              setIsOpen(false);
              router.push("/create-post");
            }}
          >
            Create Post
          </button>
        )}
        <button className=" btn-outline mt-4 w-full rounded-full bg-black p-1 text-2xl hover:bg-white">
          Canvas
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

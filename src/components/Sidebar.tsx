import React, { Dispatch, SetStateAction } from "react";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOpen }: IProps) => {
  return (
    <div>
      <label
        // className={`drawer-overlay ${
        //   isOpen ? "translate-x-0" : "-translate-x-full"
        // } duration-300 ease-in-out`}
        className={`${
          isOpen ? "drawer-overlay" : "drawer-offlay"
        } animate-fade-in-down`}
        onClick={() => setIsOpen(false)}
      ></label>
      <div
        className={`fixed top-0 left-0 h-full w-[60vw] bg-black p-10 py-20 md:w-[35vw]  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } duration-300 ease-in-out`}
      >
        <h2 className="text-2xl text-white">This is a sidebar</h2>
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";

const User: React.FC = () => {
  return (
    <div className="flex min-h-[82vh] ">
      {" "}
      <div className=" m-2 flex min-h-full w-full flex-col items-center gap-3 md:flex-row md:justify-between md:gap-3">
        <div className="card min-h-[20vh] w-full  bg-gray-900 shadow-xl md:min-h-full md:w-1/3">
          <div className="card-body w-full">
            <div className="card-title justify-center">
              <div className="placeholder avatar">
                <div className="w-24 rounded-full bg-neutral-focus text-neutral-content">
                  <span className="text-3xl">K</span>
                </div>
              </div>{" "}
            </div>
            <p className="text-center">Name</p>
            {/* <div className="card-actions justify-end">
              <button className="btn-primary btn">Buy Now</button>
            </div> */}
          </div>
        </div>
        <div className="card min-h-[50vh] w-full bg-gray-900 shadow-xl md:min-h-full md:w-2/3">
          <div className="card-body w-full">
            <h2 className="card-title text-3xl">About</h2>
            <p>Email</p>
            <p>Bio</p>
            <p>Posts</p>
            {/* <div className="card-actions justify-end">
              <button className="btn-primary btn">Buy Now</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

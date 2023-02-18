import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const User: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: userDetails } = trpc.user.getUser.useQuery(
    {
      userId: sessionData?.user?.id as string,
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: sessionData ? true : false,
      onSuccess: (success) => //console.log("success", success),
      onError: (error) => {
        //console.log("error", error);
      },
    }
  );
  return (
    <div className="flex w-full bg-gray-600 md:p-10">
      <div className="card mx-auto w-full rounded-none bg-base-100 shadow-xl lg:card-side">
        <div className="bg:gray-800 h-26 card-body w-full items-center md:h-full md:bg-gray-900 lg:w-[5vw]">
          <div className="placeholder avatar mt-10">
            <div className="w-24 rounded-full bg-neutral-focus text-neutral-content ">
              <span className="text-3xl">{userDetails?.name?.charAt(0)}</span>
            </div>
          </div>
          <p className="">{userDetails?.email}</p>
          {/* <div className="card-actions justify-end">
            <button className="btn-primary btn">Listen</button>
          </div> */}
        </div>

        <div className="card-body md:min-w-[30vw]">
          <h2 className="card-title">About Me</h2>
          <p>Name: {userDetails?.name?.charAt(0)}</p>
          <p>Bio: Hey there! I use supacode</p>
          <p>Posts made: {userDetails?.posts?.length}</p>
          {userDetails?.posts?.map((item, index) => (
            <p key={index}>Posts: {item.title}</p>
          ))}
          {/* <div className="card-actions justify-end">
            <button className="btn-primary btn">Listen</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default User;

// <div className="flex min-h-[82vh] ">
//   {" "}
//   <div className=" m-2 flex min-h-full w-full flex-col items-center gap-3 md:flex-row md:justify-between md:gap-3">
//     <div className="card min-h-[20vh] w-full  bg-gray-900 shadow-xl md:min-h-full md:w-1/3">
//       <div className="card-body w-full">
//         <div className="card-title justify-center">
//           <div className="placeholder avatar">
//             <div className="w-24 rounded-full bg-neutral-focus text-neutral-content">
//               <span className="text-3xl">K</span>
//             </div>
//           </div>{" "}
//         </div>
//         <p className="text-center">Name</p>
//         {/* <div className="card-actions justify-end">
//               <button className="btn-primary btn">Buy Now</button>
//             </div> */}
//       </div>
//     </div>
//     <div className="card min-h-[50vh] w-full bg-gray-900 shadow-xl md:min-h-full md:w-2/3">
//       <div className="card-body w-full">
//         <h2 className="card-title text-3xl">About</h2>
//         <p>Email</p>
//         <p>Bio</p>
//         <p>Posts</p>
//         {/* <div className="card-actions justify-end">
//               <button className="btn-primary btn">Buy Now</button>
//             </div> */}
//       </div>
//     </div>
//   </div>
// </div>;

import { useRouter } from "next/router";
import { MouseEvent, Touch, TouchEvent, useState } from "react";
// import data from "../../MOCK_DATA (2).json";
import { trpc } from "../utils/trpc";
import LoadingSpinner from "./LoadingSpinner";

const Posts: React.FC = () => {
  const router = useRouter();
  const [percent, setPercent] = useState(0);
  const { data: newData, isLoading } = trpc.post.getPost.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (success) => console.log("sucess", success),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleOnMove = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e && e.touches[0]) {
      const p = (e.touches[0].clientX / window.innerWidth) * 100;
      setPercent(p);
    }
    if ("clientX" in e) {
      const p = (e.clientX / window.innerWidth) * 100;
      setPercent(p);
    }
  };

  const routeToSinglePost = (id: string) => {
    router.push({
      pathname: `/posts/${id}`,
    });
  };

  return (
    <div className="flex  min-h-screen w-full flex-col overflow-hidden bg-gray-50 text-gray-400">
      <section className="relative min-h-[60vh] sm:h-full">
        <div
          className={`absolute z-10 grid  min-h-full place-items-center overflow-hidden bg-[#f3ff49] `}
          id="left-side"
          onMouseMove={handleOnMove}
          style={{ width: `${percent}%` }}
          onTouchMove={(e) => handleOnMove(e)}
        >
          <h2 className="my-0 mx-[15vw] min-w-[70vw] text-center text-[8vw] text-black">
            Random
            <span className="italic"> Codes</span>
          </h2>
        </div>
        <div
          className={`absolute grid  min-h-full place-items-center overflow-hidden bg-[#01c037] `}
          id="right-side"
          onMouseMove={handleOnMove}
          onTouchMove={(e) => handleOnMove(e)}
        >
          <h2 className="my-0 mx-[15vw] min-w-[70vw] text-center text-[8vw] text-white">
            Random <span className="italic">Science</span>
          </h2>
        </div>
      </section>

      <section className=" flex h-full flex-col items-center justify-center overflow-hidden border-red-800 bg-gray-50 py-10 px-5 text-gray-400 md:flex-row">
        <div className="flex flex-col gap-4 py-10 md:w-5/6 md:px-5">
          {[1, 2].map((item, key) => (
            <div className="container card " key={key}>
              <div className="card-body rounded-2xl bg-gray-700">
                <div className="card-title flex flex-col">
                  <div className="placeholder avatar">
                    <div className="w-16 rounded-full bg-neutral-focus text-neutral-content">
                      <span className="text-xl">JO</span>
                    </div>
                  </div>
                  <h1 className="text-xl text-white">Title of a post</h1>
                </div>
                <div className="card-body border-red-400 p-0 text-left">
                  <p className="text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perspiciatis, molestiae? Corporis repellat perferendis
                    perspiciatis, atque ipsam eos similique accusantium id
                    maiores doloribus iure maxime, optio eligendi dolor, aperiam
                    repudiandae veniam!
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="divider divider-vertical md:divider-horizontal" />
        <div className="container md:mx-auto md:flex md:w-3/12 md:px-5 md:py-10">
          <div className="container">
            <p>Recent activities</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Posts;

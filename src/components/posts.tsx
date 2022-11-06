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
    <div className="flex min-h-screen flex-col overflow-hidden bg-gray-800 text-gray-400">
      <section className="relative min-h-[60vh] w-full sm:h-full">
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

      <section className=" mt-0 flex h-full w-full overflow-hidden bg-gray-800 text-gray-400">
        <div className="container mx-auto w-5/6 px-5 py-10">
          <div className="-my-8 divide-y-2 divide-gray-800">
            <div className="flex flex-wrap py-8 md:flex-nowrap">
              <div className="mb-6 flex items-center space-x-3 md:mb-0 md:w-44 md:flex-shrink-0 md:flex-col">
                <div className="placeholder avatar mx-1 mb-3">
                  <div className="w-16 rounded-full bg-neutral-focus text-neutral-content">
                    <span className="text-xl">JO</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="title-font font-semibold text-white">
                    CATEGORY
                  </span>
                  <span className="mt-1 text-sm text-gray-500">
                    12 Jun 2019
                  </span>
                </div>
              </div>
              <div className="md:flex-grow">
                <h2 className="title-font mb-2 text-2xl font-medium text-white">
                  Bitters hashtag waistcoat fashion axe chia unicorn
                </h2>
                <p className="leading-relaxed">
                  Glossier echo park pug, church-key sartorial biodiesel
                  vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf
                  moon party messenger bag selfies, poke vaporware kombucha
                  lumbersexual pork belly polaroid hoodie portland craft beer.
                </p>
                <a className="mt-4 inline-flex items-center text-green-400">
                  Learn More
                  <svg
                    className="ml-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container hidden md:mx-auto md:flex md:w-3/12 md:px-5 md:py-10">
          <div className="md:divider md:divider-horizontal" />
          <div className="container">
            <p>Recent activities</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Posts;

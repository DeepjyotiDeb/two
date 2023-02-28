import DOMPurify from "dompurify";
import { MouseEvent, TouchEvent, useState } from "react";
// import data from "../../MOCK_DATA (2).json";
import { trpc } from "../utils/trpc";
<<<<<<< HEAD
=======
import LoadingSpinner from "./LoadingSpinner";
>>>>>>> 069b8a0f61caa461f031df4c98ca2f2c70a45da8
import Link from "next/link";

const Posts: React.FC = () => {
  // const router = useRouter();
  const [percent, setPercent] = useState(0);
  // const [html, setHtml] = useState("");
  const { data: Posts } = trpc.post.getPost.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    // onSuccess: (success) => console.log("sucess", success),
  });
  // useEffect(() => {
  //   if(Posts){
  //     const
  //   }
  // }, [Posts])

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

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

  const purifiedData = (htmlData: string) => {
    const clean = DOMPurify.sanitize(htmlData);
    // let charLimit = 200;
    // if (Number.isInteger(charLimit)) {
    //   //console.log("clean", clean[charLimit + 1]);
    // }
    // const stopAfterWhitespace = (clean: string) => {
    //   if (clean[charLimit] === undefined) {
    //     charLimit += 1;
    //     stopAfterWhitespace(clean);
    //   }
    //   if (clean[charLimit] === " ") {
    //     return clean;
    //   } else {
    //     charLimit += 1;
    //     stopAfterWhitespace(clean);
    //   }
    // };
    // return stopAfterWhitespace(clean)?.concat("...");
    return clean;
  };

  // const routeToSinglePost = (id: string) => {
  //   router.push({
  //     pathname: `/posts/${id}`,
  //   });
  // };

  return (
    <div className="flex  min-h-screen w-full flex-col overflow-hidden bg-gray-50 text-gray-400">
      <section className="relative min-h-[50vh] ">
        <div
          className={`absolute z-10 grid  min-h-full place-items-center overflow-hidden bg-[#f3ff49] `}
          id="left-side"
          onMouseMove={handleOnMove}
          style={{ width: `${percent}%` }}
          onTouchMove={(e) => handleOnMove(e)}
        >
          <h2 className="my-0 mx-[15vw] min-w-[70vw] text-center text-[8vw] text-black">
            Write
            <span className="italic"> Something</span>
          </h2>
        </div>
        <div
          className={`absolute grid  min-h-full place-items-center overflow-hidden bg-[#01c037] `}
          id="right-side"
          onMouseMove={handleOnMove}
          onTouchMove={(e) => handleOnMove(e)}
        >
          <h2 className="my-0 mx-[15vw] min-w-[70vw] text-center text-[8vw] text-white">
            Read <span className="italic">Something</span>
          </h2>
        </div>
      </section>

      <section
        className=" flex h-full flex-col items-center justify-center overflow-hidden
      bg-gradient-to-b from-gray-500 to-gray-900
      py-0 px-5 text-gray-400 md:flex-row"
      >
        <div className="flex w-full flex-col gap-4 py-4 md:w-5/6 md:px-5">
          {Posts &&
            Posts?.map((post, key) => (
              <div className="container card " key={key}>
                <div className="card-body rounded-2xl bg-gray-700">
                  <div className="card-title flex flex-row ">
                    <div className="placeholder avatar">
                      <div className="w-16 rounded-full bg-neutral-focus text-neutral-content">
                        <span className="text-xl">
                          {post?.user?.name?.charAt(0).toLocaleUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="hover:text-white">
                      <Link href={`${post.id}`}>{post?.title}</Link>
                      <p className="text-xs">
                        {post?.createdAt.toString().substring(0, 15)}
                      </p>
                    </div>
                  </div>
                  <div className="card-body border-red-400 p-0 text-left">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: purifiedData(
                          post?.body.substring(0, 208).concat(".....")
                        ),
                      }}
                      className="text-white"
                    ></div>
                    <p className="text-white">
                      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis, molestiae? Corporis repellat perferendis
                      perspiciatis, atque ipsam eos similique accusantium id
                      maiores doloribus iure maxime, optio eligendi dolor,
                      aperiam repudiandae veniam! */}
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

import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
// import data from "../../MOCK_DATA (2).json";
import { trpc } from "../utils/trpc";
import LoadingSpinner from "./LoadingSpinner";

const Posts: React.FC = () => {
  const router = useRouter();
  const { data: newData, isLoading } = trpc.post.getPost.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (success) => console.log("sucess", success),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const routeToPost = (id: string) => {
    router.push({
      pathname: `/posts/${id}`,
    });
  };
  // return (
  //   <section classNameNameName="body-font mt-8 min-h-screen overflow-hidden bg-gray-800 text-gray-400">
  //     <div classNameNameName="container mx-auto px-5 py-24">
  //       <div classNameNameName="-m-12 mx-0 flex flex-wrap space-y-1">
  //         {/* <div classNameNameName="flex flex-col items-start p-12 md:w-1/2">
  //           <span classNameNameName="inline-block rounded bg-gray-800 py-1 px-2 text-xs font-medium tracking-widest text-gray-400 text-opacity-75">
  //             CATEGORY
  //           </span>
  //           <h2 classNameNameName="title-font mt-4 mb-4 text-2xl font-medium text-white sm:text-3xl">
  //             Roof party normcore before they sold out, cornhole vape
  //           </h2>
  //           <p classNameNameName="mb-8 leading-relaxed">
  //             Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal
  //             portland. VHS man braid palo santo hoodie brunch trust fund.
  //             Bitters hashtag waistcoat fashion axe chia unicorn. Plaid fixie
  //             chambray 90s, slow-carb etsy tumeric. Cray pug you probably havent
  //             heard of them hexagon kickstarter craft beer pork chic.
  //           </p>
  //           <div classNameNameName="mb-4 mt-auto flex w-full flex-wrap items-center border-b-2 border-gray-800 border-opacity-75 pb-4">
  //             <a classNameNameName="inline-flex items-center text-green-400">
  //               Learn More
  //               <svg
  //                 classNameNameName="ml-2 h-4 w-4"
  //                 viewBox="0 0 24 24"
  //                 stroke="currentColor"
  //                 strokeWidth="2"
  //                 fill="none"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               >
  //                 <path d="M5 12h14"></path>
  //                 <path d="M12 5l7 7-7 7"></path>
  //               </svg>
  //             </a>
  //             <span classNameNameName="mr-3 ml-auto inline-flex items-center border-r-2 border-gray-800 py-1 pr-3 text-sm leading-none text-gray-500">
  //               <svg
  //                 classNameNameName="mr-1 h-4 w-4"
  //                 stroke="currentColor"
  //                 strokeWidth="2"
  //                 fill="none"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
  //                 <circle cx="12" cy="12" r="3"></circle>
  //               </svg>
  //               1.2K
  //             </span>
  //             <span classNameNameName="inline-flex items-center text-sm leading-none text-gray-500">
  //               <svg
  //                 classNameNameName="mr-1 h-4 w-4"
  //                 stroke="currentColor"
  //                 strokeWidth="2"
  //                 fill="none"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
  //               </svg>
  //               6
  //             </span>
  //           </div>
  //           <a classNameNameName="inline-flex items-center">
  //             <Image
  //               loader={() => "https://dummyimage.com/104x104"}
  //               unoptimized
  //               alt="blog"
  //               height={42}
  //               width={42}
  //               src="https://dummyimage.com/104x104"
  //               classNameNameName="h-12 w-12 flex-shrink-0 rounded-full object-cover object-center"
  //             />
  //             <span classNameNameName="flex flex-grow flex-col pl-4">
  //               <span classNameNameName="title-font font-medium text-white">
  //                 Holden Caulfield
  //               </span>
  //               <span classNameNameName="mt-0.5 text-xs tracking-widest text-gray-500">
  //                 UI DEVELOPER
  //               </span>
  //             </span>
  //           </a>
  //         </div> */}
  //         {newData &&
  //           newData.map((postData) => (
  //             <div
  //               key={postData.id}
  //               classNameNameName="flex flex-col items-start rounded-3xl p-12 hover:bg-gray-900 md:w-1/2"
  //             >
  //               <span classNameNameName="inline-block rounded bg-gray-900 py-1 px-2 text-xs font-medium tracking-widest text-gray-400 text-opacity-75">
  //                 {postData.categories.map((item) => item.categoryName)}
  //               </span>
  //               <h2 classNameNameName="title-font mt-4 mb-4 text-2xl font-medium text-white sm:text-3xl">
  //                 {postData.title}
  //               </h2>
  //               <p classNameNameName="mb-8 leading-relaxed">{postData.body}</p>
  //               <div classNameNameName="mb-4 mt-auto flex w-full flex-wrap items-center border-b-2 border-gray-500 border-opacity-75 pb-4">
  //                 <div
  //                   classNameNameName="inline-flex cursor-pointer items-center text-green-400 hover:text-green-600"
  //                   onClick={() => routeToPost(postData.id as string)}
  //                 >
  //                   Learn More
  //                   <svg
  //                     classNameNameName="ml-2 h-4 w-4"
  //                     viewBox="0 0 24 24"
  //                     stroke="currentColor"
  //                     strokeWidth="2"
  //                     fill="none"
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                   >
  //                     <path d="M5 12h14"></path>
  //                     <path d="M12 5l7 7-7 7"></path>
  //                   </svg>
  //                 </div>
  //                 <span classNameNameName="mr-3 ml-auto inline-flex items-center border-r-2 border-gray-800 py-1 pr-3 text-sm leading-none text-gray-500">
  //                   <svg
  //                     classNameNameName="mr-1 h-4 w-4"
  //                     stroke="currentColor"
  //                     strokeWidth="2"
  //                     fill="none"
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     viewBox="0 0 24 24"
  //                   >
  //                     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
  //                     <circle cx="12" cy="12" r="3"></circle>
  //                   </svg>
  //                   {0.2}K
  //                 </span>
  //                 <span classNameNameName="inline-flex items-center text-sm leading-none text-gray-500">
  //                   <svg
  //                     classNameNameName="mr-1 h-4 w-4"
  //                     stroke="currentColor"
  //                     strokeWidth="2"
  //                     fill="none"
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     viewBox="0 0 24 24"
  //                   >
  //                     <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
  //                   </svg>
  //                   {postData._count.comments}
  //                 </span>
  //               </div>
  //               <a classNameNameName="inline-flex items-center">
  //                 <Image
  //                   loader={() => "https://dummyimage.com/104x104"}
  //                   unoptimized
  //                   alt="blog"
  //                   height={42}
  //                   width={42}
  //                   src="https://dummyimage.com/104x104"
  //                   classNameNameName="h-12 w-12 flex-shrink-0 rounded-full object-cover object-center"
  //                 />
  //                 <span classNameNameName="flex flex-grow flex-col pl-4">
  //                   <span classNameNameName="title-font font-medium text-white">
  //                     {postData.user && postData.user.name}
  //                   </span>
  //                   {/* <span classNameNameName="mt-0.5 text-xs tracking-widest text-gray-500">
  //                 DESIGNER
  //               </span> */}
  //                 </span>
  //               </a>
  //             </div>
  //           ))}
  //       </div>
  //     </div>
  //   </section>
  // );
  return (
    <section className="body-font mt-12 flex min-h-screen w-full overflow-hidden bg-gray-800 text-gray-400">
      <div className="container mx-auto w-5/6 px-5 py-10">
        <div className="-my-8 divide-y-2 divide-gray-800">
          <div className="flex flex-wrap py-8 md:flex-nowrap">
            <div className="mb-6 flex items-center space-x-3 md:mb-0 md:w-64 md:flex-shrink-0 md:flex-col">
              <div className="placeholder avatar mx-1 mb-3">
                <div className="w-16 rounded-full bg-neutral-focus text-neutral-content">
                  <span className="text-xl">JO</span>
                </div>
              </div>
              <span className="title-font font-semibold text-white">
                CATEGORY
              </span>
              <span className="mt-1 text-sm text-gray-500">12 Jun 2019</span>
            </div>
            <div className="md:flex-grow">
              <h2 className="title-font mb-2 text-2xl font-medium text-white">
                Bitters hashtag waistcoat fashion axe chia unicorn
              </h2>
              <p className="leading-relaxed">
                Glossier echo park pug, church-key sartorial biodiesel
                vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon
                party messenger bag selfies, poke vaporware kombucha
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
          <div className="flex flex-wrap py-8 md:flex-nowrap">
            <div className="mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64">
              <span className="title-font font-semibold text-white">
                CATEGORY
              </span>
              <span className="mt-1 text-sm text-gray-500">12 Jun 2019</span>
            </div>
            <div className="md:flex-grow">
              <h2 className="title-font mb-2 text-2xl font-medium text-white">
                Bitters hashtag waistcoat fashion axe chia unicorn
              </h2>
              <p className="leading-relaxed">
                Glossier echo park pug, church-key sartorial biodiesel
                vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon
                party messenger bag selfies, poke vaporware kombucha
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
  );
};

export default Posts;

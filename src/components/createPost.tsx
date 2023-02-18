import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { SendIcon, WarningIcon } from "./SvgList";
import { MiniLoader } from "./MiniLoader";
import { useRouter } from "next/router";

// const QuillNoSSRWrapper = dynamic(import("react-quill"), {
//   ssr: false,
//   loading: () => <LoadingSpinner />,
// });

const CreatePost: React.FC = () => {
  const { data } = useSession();
  const router = useRouter();
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        "link",
        // "image"
      ],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    // "image",
  ];
  const [text, setText] = useState({ title: "", category: "" });
  const [convertedText, setConvertedText] = useState("");
  const [warning, setWarning] = useState(false);
  const { mutateAsync, isLoading } = trpc.post.createPost.useMutation();
  const handleChange = (e: {
    preventDefault: () => void;
    target: { name: string; value: string };
  }) => {
    e.preventDefault();
    setText({ ...text, [e.target.name]: e.target.value });
  };
  // const disablePost = ({title, category, body}:string) => {

  // }
  const warnFunction = () => {
    setWarning(true);
    setTimeout(() => {
      setWarning(false);
    }, 2000);
  };
  const isQuillEmpty = (value: string) => {
    if (
      value.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
      !value.includes("<img")
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // //console.log("text", text, convertedText);
    if (isQuillEmpty(convertedText)) {
      warnFunction();
      return;
    }
    if (data?.user?.id) {
      try {
        const res = await mutateAsync({
          body: convertedText,
          category: [text.category],
          title: text.title,
          userId: data.user.id,
        });
        router.push("/");
        // //console.log("res", res);
      } catch (error) {
        //console.log(error);
      }
    }
  };
  return (
    <section className="max-h-full w-full overflow-hidden bg-base-100 text-gray-400">
      <div
        className={`${
          warning ? "opacity-100" : "opacity-0"
        }  alert alert-warning absolute right-0 bottom-0 w-60 shadow-lg transition-opacity duration-500 ease-in`}
      >
        <div>
          <WarningIcon />
          <span>Warning: Cannot post without a body!</span>
        </div>
      </div>
      <form className="p-8" onSubmit={handleSubmit}>
        <textarea
          autoFocus
          className="textarea-info textarea w-full rounded-lg bg-white text-black placeholder:text-gray-400 "
          rows={1}
          placeholder="Give a title"
          value={text.title}
          onChange={handleChange}
          name="title"
          required
        ></textarea>
        <textarea
          className="textarea-info textarea w-full bg-white text-black placeholder:text-gray-400"
          rows={1}
          placeholder="What's the category?"
          value={text.category}
          onChange={handleChange}
          name="category"
          required
        ></textarea>
        <ReactQuill
          theme="snow"
          value={convertedText}
          onChange={setConvertedText}
          className="bg-white text-black"
          modules={modules}
          formats={formats}
        />
        <div className="mt-3 flex justify-center">
          <button
            // disabled={() => disablePost({title:text.title, category:text.category, body:text.body})}
            className="btn-md btn gap-2 bg-slate-200 text-gray-700 hover:bg-gray-900 hover:text-white disabled:bg-gray-400 disabled:text-gray-500"
            type="submit"
          >
            {!isLoading ? <SendIcon /> : <MiniLoader />}
            Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;

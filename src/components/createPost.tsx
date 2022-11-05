import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import "react-quill/dist/quill.snow.css";
import LoadingSpinner from "./LoadingSpinner";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";

// const QuillNoSSRWrapper = dynamic(import("react-quill"), {
//   ssr: false,
//   loading: () => <LoadingSpinner />,
// });

const CreatePost: React.FC = () => {
  const { data } = useSession();
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const [text, setText] = useState({ title: "", category: "", body: "" });
  const [convertedText, setConvertedText] = useState("");
  const { mutateAsync } = trpc.post.createPost.useMutation();
  const handleChange = (e: {
    preventDefault: () => void;
    target: { name: string; value: string };
  }) => {
    e.preventDefault();
    setText({ ...text, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("text", text);
    if (data?.user?.id) {
      try {
        const res = await mutateAsync({
          body: text.body,
          category: [text.category],
          title: text.title,
          userId: data.user.id,
        });
        console.log("res", res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className="max-h-full overflow-hidden bg-yellow-600 text-gray-400">
      {/* <div className="container mx-auto px-5 py-24">
        <form onSubmit={handleSubmit}>
          <div className="m-2 grow min-h-min flex-wrap">
            <label>Post Title</label>
            <textarea
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Title..."
              name="title"
              onChange={handleChange}
            ></textarea>
            <label>Category</label>
            <textarea
              id="category"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Category..."
              name="category"
              rows={1}
              onChange={handleChange}
            ></textarea>
            <label>Body</label>
            <textarea
              id="body"
              rows={4}
              className="min-h-50 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Body..."
              name="body"
              onChange={handleChange}
            ></textarea>
            <div className="flex justify-center space-x-2">
              <button
                className="inline-block rounded bg-green-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
                type="submit"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div> */}
      <div className="editor-container bg-blue-300 p-10">
        <ReactQuill
          theme="snow"
          value={convertedText}
          onChange={setConvertedText}
          className="editor bg-white"
          modules={modules}
          formats={formats}
        />
      </div>
    </section>
  );
};

export default CreatePost;

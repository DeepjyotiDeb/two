import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import "react-quill/dist/quill.snow.css";
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
          body: convertedText,
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
    <section className="max-h-full w-full overflow-hidden bg-yellow-600 text-gray-400">
      <div className="editor-container bg-blue-300 p-10">
        <textarea
          className="textarea-info textarea"
          placeholder="Title...."
          value={text.title}
          onChange={handleChange}
          name="title"
        ></textarea>
        <textarea
          className="textarea-info textarea"
          placeholder="Category...."
          value={text.category}
          onChange={handleChange}
          name="category"
        ></textarea>
        <ReactQuill
          theme="snow"
          value={convertedText}
          onChange={setConvertedText}
          className="editor bg-white"
          modules={modules}
          formats={formats}
        />
        <button className="btn-lg btn" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </section>
  );
};

export default CreatePost;

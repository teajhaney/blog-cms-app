import { useState } from "react";
import {
  ButtonComponent,
  InputComponent,
  TextareaComponent,
} from "../components/export_components";
import { useBlogContext } from "../context/usePostContext";

const HomePage = () => {
  const { addToBlogList } = useBlogContext();
  const [title, setTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  //Handle add to post
  const HandleAddToBlogList = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() && !blogContent.trim()) return;
    addToBlogList({ title: title, content: blogContent });
    setTitle("");
    setBlogContent("");
  };
  return (
    <div className="bodyContent border border-primary rounded  my-20  h-screen flex flex-col gap-2">
      <h1 className="text-5xl font-extrabold text-primary">Create blog</h1>
      {/* create blog */}
      <form onSubmit={HandleAddToBlogList}>
        <div className="flex flex-col gap-2">
          <InputComponent
            placeHolder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextareaComponent
            placeHolder="Write your blog... (include Markdown)"
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
          />
          <ButtonComponent
            text="Post blog"
            type="submit"
            className={"bg-secondary self-end"}
          />
        </div>
      </form>
      <h1 className="text-5xl font-extrabold text-primary">FEED</h1>
    </div>
  );
};

export default HomePage;

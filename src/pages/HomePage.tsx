import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import {
  BlogListComponent,
  ButtonComponent,
  InputComponent,
  TextareaComponent,
} from "../components/export_components";
import { useBlogContext } from "../context/usePostContext";

const HomePage = () => {
  const { addToBlogList, clearBlogs } = useBlogContext();
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
    <section className="relative bodyContent bg-accents rounded  my-20  h-fit flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-5xl font-extrabold text-primary">
          Create blog
        </h1>
        <GrPowerReset
          className="cursor-pointer text-2xl text-primary"
          onClick={clearBlogs}
        />
      </div>
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
            className="min-h-30"
            onChange={(e) => setBlogContent(e.target.value)}
          />
          <ButtonComponent
            text="Post blog"
            type="submit"
            className={"bg-secondary self-end text-sm md:text-2xl "}
          />
        </div>
      </form>
      {/* feed */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl md:text-5xl font-extrabold text-primary">
          FEED
        </h1>
        <BlogListComponent />
      </div>
    </section>
  );
};

export default HomePage;

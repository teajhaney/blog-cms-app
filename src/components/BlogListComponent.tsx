import { motion } from "motion/react";
import { useBlogContext } from "../context/usePostContext";
import Markdown from "react-markdown";
import { CiEdit } from "react-icons/ci";
import { PiTrashThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import {
  ButtonComponent,
  InputComponent,
  TextareaComponent,
} from "../components/export_components";

const BlogListComponent = () => {
  const { blogList, deleteBlog, updateBlog } = useBlogContext();

  //edit
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [showEditBox, SetShowEditBox] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [blogEdited, setBlogEdited] = useState(false);
  const blog = blogList.find((b) => b.id === editId);

  //check if content has changed
  useEffect(() => {
    if (blog) {
      setBlogEdited(editTitle !== blog.title || editContent !== blog.content);
    }
  }, [editTitle, editContent, blog]);
  // Animation variants for blog items
  const variants = {
    hidden: { opacity: 0, y: -20 }, // Start above and invisible
    visible: { opacity: 1, y: 0 }, // Fade in and slide down
  };
  //handle blog delete
  const handleDelete = (e: React.MouseEvent<SVGElement>, id: string) => {
    e.stopPropagation();
    deleteBlog(id);
  };

  const handleClickToUpdateBlog = (
    e: React.MouseEvent<SVGElement>,
    id: string,
    title: string,
    content: string
  ) => {
    e.stopPropagation();
    SetShowEditBox(true);
    setEditId(id);
    setEditTitle(title);
    setEditContent(content);
  };
  //Handle update confirmation
  const handleBlogUpdate = (id: string) => {
    if (!editTitle.trim() && !editContent) return;
    if (blogEdited) {
      updateBlog(id, { title: editTitle, content: editContent });
      SetShowEditBox(false);
      setEditId(null);
      setEditContent("");
      setEditTitle("");
    } else {
      handleBlogUpdateCancel();
    }
  };

  //cancel update
  const handleBlogUpdateCancel = () => {
    SetShowEditBox(false);
    setEditId(null);
    setEditTitle("");
    setEditContent("");
  };
  return (
    <div className=" h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden flex flex-col gap-5">
      {blogList.length === 0 ? (
        <p className="text-center text-5xl font-bold text-primary">No feed</p>
      ) : (
        blogList.map((blog) => (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            layout
            transition={{ duration: 0.5 }}
            key={blog.id}
            className="cursor-pointer  border border-brown  flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-textColor text-xl underline decoration-textColor">
                {blog.title}
              </h1>
              {/* buttons */}
              <div className="flex gap-2 text-2xl font-extrabold items-start ">
                <CiEdit
                  className="text-primary"
                  onClick={(e) =>
                    handleClickToUpdateBlog(
                      e,
                      blog.id,
                      blog.title,
                      blog.content
                    )
                  }
                />
                <PiTrashThin
                  className="text-red-500"
                  onClick={(e) => handleDelete(e, blog.id)}
                />{" "}
              </div>
            </div>
            <Markdown>{blog.content}</Markdown>
            <div
              className={`flex ${
                blog.isEdited ? "justify-between" : "justify-end"
              }`}>
              {blog.isEdited && (
                <span className="text-[7px]  text-secondary/50 italic">
                  Edited ({blog.editedAt})
                </span>
              )}
              <p className="text-[10px] ">{blog.createdAt}</p>
            </div>
          </motion.div>
        ))
      )}
      {/* edit */}
      <div>
        {showEditBox && editId !== null && (
          <div className="fixed inset-0  flex items-center justify-center border border-primary ">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col gap-5 bg-white p-6 rounded-lg shadow-[0px_0px_5px_3px_rgba(0,0,0,0.1)] w-full mx-3 2xl:mx-auto 2xl:w-[1350px]">
              <h1 className="text-2xl font-bold text-primary">
                Edit your blog
              </h1>
              <div className="flex flex-col gap-2">
                <InputComponent
                  placeHolder="Enter blog title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <TextareaComponent
                  placeHolder="Write your blog... (include Markdown)"
                  value={editContent}
                  className="min-h-96"
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="flex gap-2 self-end">
                  <ButtonComponent
                    text="Cancel"
                    onClick={handleBlogUpdateCancel}
                    className={"bg-secondary  text-sm md:text-2xl "}
                  />
                  <ButtonComponent
                    text="Update blog"
                    onClick={() => handleBlogUpdate(editId)}
                    className={"bg-secondary  text-sm md:text-2xl "}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListComponent;

import { useState, useEffect, ReactNode } from "react";
import { BlogContext } from "./usePostContext";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string; // Full timestamp
  //   day: string; // e.g., "March 23, 2025"
  editedAt?: string;
  isEdited?: boolean;
}

export interface BlogContextType {
  blogList: Blog[];
  addToBlogList: (blog: Omit<Blog, "id" | "createdAt">) => void;
  updateBlog: (id: string, updates: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
  getBlogByID: (id: string) => void;
  clearBlogs: () => void;
}
///////////////
export const BlogProvider = ({ children }: { children: ReactNode }) => {
  //post initialisation
  const [blogList, setBlogList] = useState<Blog[]>(() => {
    const savedPosts = localStorage.getItem("blogList");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  //save post to local storage
  useEffect(() => {
    localStorage.setItem("blogList", JSON.stringify(blogList));
  }, [blogList]);

  //add post to postList
  const addToBlogList = (blog: Omit<Blog, "id" | "createdAt">) => {
    const newBlog: Blog = {
      ...blog,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Use false for 24-hour format
      }),
    };
    setBlogList((prevBlog) => [newBlog, ...prevBlog]);
  };
  //update or Edit Blog
  const updateBlog = (id: string, updates: Partial<Blog>) => {
    setBlogList((prevBlog) =>
      prevBlog.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              ...updates,
              isEdited: true,
              editedAt: new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true, // Use false for 24-hour format
              }),
            }
          : blog
      )
    );
  };
  //delete psot
  const deleteBlog = (id: string) => {
    setBlogList((prevPost) => prevPost.filter((blog) => blog.id !== id));
  };

  //Clear blog
  const clearBlogs = () => {
    localStorage.clear();
    setBlogList([]);
  };

  //find post by ID
  const getBlogByID = (id: string) => blogList.find((blog) => blog.id === id);

  return (
    <BlogContext.Provider
      value={{
        blogList,
        addToBlogList,
        updateBlog,
        deleteBlog,
        clearBlogs,
        getBlogByID,
      }}>
      {children}
    </BlogContext.Provider>
  );
};

import { useState, useEffect, ReactNode } from "react";
import { BlogContext } from "./usePostContext";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string; // Full timestamp
  //   day: string; // e.g., "March 23, 2025"
  editedAt?: string;
  isEdited?: boolean;
}

export interface BlogContextType {
  postList: Post[];
  addToPostList: (post: Omit<Post, "id" | "createdAt">) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  getPostByID: (id: string) => void;
}
///////////////
export const BlogProvider = ({ children }: { children: ReactNode }) => {
  //post initialisation
  const [postList, setPostList] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem("postList");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  //save post to local storage
  useEffect(() => {
    localStorage.setItem("postList", JSON.stringify(postList));
  }, [postList]);

  //add post to postList
  const addToPostList = (post: Omit<Post, "id" | "createdAt">) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Use false for 24-hour format
      }),
    };
    setPostList((prevPost) => [newPost, ...prevPost]);
  };
  //update or Edit post
  const updatePost = (id: string, updates: Partial<Post>) => {
    setPostList((prevPost) =>
      prevPost.map((post) =>
        post.id === id
          ? {
              ...post,
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
          : post
      )
    );
  };
  //delete psot
  const deletePost = (id: string) => {
    setPostList((prevPost) => prevPost.filter((post) => post.id !== id));
  };

  //find post by ID
  const getPostByID = (id: string) => postList.find((post) => post.id === id);

  return (
    <BlogContext.Provider
      value={{ postList, addToPostList, updatePost, deletePost, getPostByID }}>
      {children}
    </BlogContext.Provider>
  );
};

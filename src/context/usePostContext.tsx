import { createContext, useContext } from "react";
import { BlogContextType } from "./PostProvider";

export const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlogContext = () => {
    const context = useContext(BlogContext);
    if (!context) throw new Error("useBlogContext must be used within BlogProvider");
    return context;
}
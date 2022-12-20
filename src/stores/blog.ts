import { defineStore } from "pinia";
import { Blog } from "@/types/types";
export const useBlogStore = defineStore("Blogs", {
    state: () => {
        return {
            blogs: [],
            activeBlogUUID: null
        };
    },

    actions: {
        setBlogs(blogs: Blog[]) {
            this.blogs = blogs;
        },

        setActiveBlog(uuid: string) {
            this.activeBlogUUID = uuid;
        }
    },

    getters: {
        getBlogs(state) {
            return state.blogs;
        },

        getActiveBlog: (state) =>
            (currentUUID: string):Blog => state.blogs.find(blog => blog.uuid == currentUUID)
            //state.blogs.find(blog => blog.uuid === currentUUID)
        
    }
});
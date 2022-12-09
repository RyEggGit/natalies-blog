import { defineStore } from "pinia";
import { Blog } from "@/types/types";
export const useBlogStore = defineStore("Blogs", {
    state: () => {
        return {
            blogs: [] as Blog[],
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

        getActiveBlog() {
            return this.blogs.find(blog => blog.uuid === this.activeBlogUUID);
        }
    }
});
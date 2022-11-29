import axios from "axios";
import { Blog } from "../types/types";


export const getBlogs = (): Promise<Blog[]> => {
    console.log(window.location.href);
    //@ts-ignore
    return axios.get(`${import.meta.env.BASE_URL}api/blog`).then((resp) => {
        console.log(resp.data);
        return resp.data;
    });
};
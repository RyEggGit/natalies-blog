import axios from "axios";
import { Blog } from "../types/types";
import { useBlogStore } from "../stores/blog";

export const getBlogs = (): void => {
    //@ts-ignore
    axios.get(`${import.meta.env.BASE_URL}api/blog`).then((resp) => {
        useBlogStore().setBlogs(resp.data);
    });
};

export const getBlog = (uuid: string): Promise<void> => {
    //@ts-ignore
    return axios.get(`${import.meta.env.BASE_URL}api/blog`, { params: { uuid: uuid } }).then((resp) => {
        useBlogStore().pushBlogs(resp.data);
    });
};

export const getBlogUUIDs = (): Promise<string[]> => {
    //@ts-ignore
    return axios.get(`${import.meta.env.BASE_URL}api/load`).then((resp) => {
        return resp.data;
    });
};

export const removeBlog = (uuid: string): void => {
    //@ts-ignore
    axios.delete(`${import.meta.env.BASE_URL}api/blog`, { params: { "uuid": uuid } }).then(() => {
        getBlogs();
    });
};


export const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> => {
    //https://stackoverflow.com/questions/18650168/convert-blob-to-base64
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
};


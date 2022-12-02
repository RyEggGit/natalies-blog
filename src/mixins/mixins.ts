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



export const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> => {
    //https://stackoverflow.com/questions/18650168/convert-blob-to-base64
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
};
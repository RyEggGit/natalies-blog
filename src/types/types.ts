export interface Blog {
    title: string;
    description: string;
    image?: any;
    blog: string;
    date: string;
    uuid: string;
    category: "food" | "life" | "running" | null;
}
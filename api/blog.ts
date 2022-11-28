import { connectToDatabase } from "./mongodb";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Collection } from "mongodb";


export default async function handler(request: VercelRequest, response: VercelResponse) {
    const database = await connectToDatabase();
    const collection = database?.database.collection("blogs") as Collection;

    if (request.method == "GET") {
        const blogs = await collection.find({}).project({ _id: 0 }).toArray();
        return response.status(200).json(blogs);
    }
    else if (request.method == "POST") {
        const blogs = request.body;
        await collection.insertOne(blogs);
        return response.status(200).json({ Status: "Successfully added blog to database" });
    }

}
import { connectToDatabase } from "./mongodb";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Collection } from "mongodb";
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';


export default async function handler(request: VercelRequest, response: VercelResponse) {
    const database = await connectToDatabase();
    const collection = database?.database.collection("blogs") as Collection;

    if (request.method == "GET") {
        const uuid = request.query.uuid;

        if (uuid) {
            const blog = await collection.findOne({ uuid: uuid });
            return response.status(200).json(blog);

        } else {
            const blogs = await collection.find({}).project({ _id: 0 }).toArray().sort(() => Math.random() - 0.5);
            return response.status(200).json(blogs);
        }



    }
    else if (request.method == "POST") {
        const blogs = request.body;
        blogs["uuid"] = uuidv4();

        console.log(blogs.password)
        console.log(process.env.PASSWORD)

        if (blogs.password === process.env.PASSWORD) {
            await collection.insertOne(blogs);
            return response.status(200).json({ Status: "Successfully added blog to database" });
        } else {
            return response.status(403).json({ Status: "Error Creating Blog" });
        }

    }
    else if (request.method == "DELETE") {
        const uuid = request.query.uuid;
        await collection.deleteOne({ "uuid": uuid });
        return response.status(200).json({ Status: "Successfully removed blog from database" });
    } else {
        return response.status(404).json({ Status: "Method not authorized" });
    }

}
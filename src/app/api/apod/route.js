import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;

let client;
let clientPromise;

client = new MongoClient(uri);
clientPromise = client.connect();

export async function GET(){
    try{
        client = await clientPromise;
        const db = client.db("astrodex");
        const apod = db.collection("apod");

        let data = await apod.findOne({}, {sort:{_id: -1}});
        return Response.json(data);
    }catch(e){
        return Response.json({error:e.message}, {status:500});
    }
}
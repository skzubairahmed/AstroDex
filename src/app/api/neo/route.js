import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;

let client;
let mongoClient;

client = new MongoClient(uri);
mongoClient = await client.connect();

export async function GET(){
    try{
        let client = await mongoClient;
        let db = client.db("astrodex");
        let asteroids = db.collection("asteroids");

        let result = await asteroids.find({}).toArray();
        return Response.json(result);
    }catch(e){
        return Response.json({message:e.message}, {status:500});
    }
}
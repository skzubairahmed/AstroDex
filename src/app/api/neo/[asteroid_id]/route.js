import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function GET(request, { params }) {
    try {
        const { asteroid_id } = await params;
        const connectedClient = await clientPromise;
        const db = connectedClient.db("astrodex");
        const asteroids = db.collection("asteroids");
        
        const data = await asteroids.findOne({ spkid: Number(asteroid_id) });
        return Response.json({ result: data });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
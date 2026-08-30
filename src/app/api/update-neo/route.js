import fs from 'fs';
import path from 'path';

import { MongoClient } from "mongodb";
import Papa from 'papaparse';

let uri = process.env.MONGODB_URI;

let client;
let clientPromise;

client = new MongoClient(uri);
clientPromise = await client.connect();

export async function GET(){
    try{
        let client = await clientPromise;
        let db = client.db("astrodex");
        let asteroids = db.collection("asteroids");
        let syncState = await db.collection("sync_state").findOne({_id:"asteroids_sync_state"});

        const filePath = path.join(process.cwd(), 'public', 'asteroids.csv');
        const csvText = fs.readFileSync(filePath, 'utf8');

        const asteroidArray = Papa.parse(csvText, {
            header:true,
            skipEmptyLines:true,
            dynamicTyping:true
        }).data;

        const page = syncState ? syncState.page : 0;
        const elementsPerBatch = 100000;
        const target = page + elementsPerBatch;
        let payload = asteroidArray.slice(page, target);

        const result = await asteroids.insertMany(payload);

        let res = await db.collection("sync_state").updateOne(
            {_id: "asteroids_sync_state"},
            {$set: {page:(page+payload.length)}},
            {upsert: true}
        );

        return Response.json({message:`Inserted ${result.insertedCount}, updated sync state too ${res.upsertedCount}.`});
    }catch(e){
        return Response.json({message:e.message}, {status:500})
    }
}
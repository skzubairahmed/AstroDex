import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let nasa_api_key = process.env.NASA_API_KEY;

let client;
let clientPromise;

client = new MongoClient(uri);
clientPromise = client.connect();

export async function GET(request){
    let authHeader = request.headers.get("authorization");
    if(authHeader !== `Bearer ${process.env.CRON_SECRET}`){
        return Response.json({"message":"Unauthorized"}, {status:401});
    }

    try{
        const client = await clientPromise;
        const db = client.db("astrodex");
        const apod = db.collection("apod");

        let apodRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasa_api_key}`);
        let apodData = await apodRes.json();
        
        let apodUpdate = {
            "date":apodData.date,
            "title":apodData.title,
            "explaination":apodData.explanation,
            "url":apodData.url,
            "copyright":apodData.copyright
        };

        await apod.updateOne(
            {date: apodData.date},
            {$set: apodUpdate},
            {upsert: true}
        );    
        return Response.json({success:true, savedDate:apodData.date});
    }catch(e){
        return Response.json({success:false, error:e.message}, {status:500});
    }finally{
        await client.close();
    }
}
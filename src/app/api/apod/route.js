import { MongoClient } from "mongodb";
import { unstable_cache } from "next/cache";

let uri = process.env.MONGODB_URI;

let client;
let clientPromise;

client = new MongoClient(uri);
clientPromise = client.connect();

const getApodData = unstable_cache(
    async () => {
            try{
                client = await clientPromise;
                const db = client.db("astrodex");
                const apod = db.collection("apod");

                let data = await apod.findOne({}, {sort:{_id: -1}});
                return data
            }catch(e){
                return e.message
            }finally{
                await client.close();
            }
    },
    ["apod-cache"],
    {revalidate: 3600}
);

export async function GET(){
    try{
        let res = await getApodData();
        let data = res;
        console.log(data);
        return Response.json(data);
    }catch(e){
        return Response.json({error:e.message}, {status:500});
    }
}
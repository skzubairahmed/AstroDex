"use client"

import { useParams } from "next/navigation";
import Navbar from "@/app/Components/Navbar";
import SideBar from "@/app/Components/SideBar";
import { useEffect, useState } from "react";

export default function AsteroidViewer() {
    const params = useParams();
    const {asteroid_id} = params;

    let [asteroidData, setAsteroidData] = useState(null);

    useEffect(() => {
        async function getAsteroidData(){
            try{
                const res = await fetch(`/api/neo/${Number(asteroid_id)}`);
                const data = await res.json();

                setAsteroidData(data.result);
            }catch(e){
                setAsteroidData(e);
            }
        }

        getAsteroidData();
    }, []);

    return (
        <>
            {asteroidData !== null ? (
                <div className="p-0 m-0 w-screen flex flex-col h-screen bg-bg-primary overflow-hidden">
                    <Navbar />
                    <div className="flex md:flex-row flex-1 overflow-hidden">
                        <SideBar />
                        <main className="w-full h-full flex-col p-2 overflow-y-auto">
                            <div className="w-full flex flex-col gap-3">
                                <div className="w-full h-full rounded-lg border-1 border-satellite/20 p-3 flex flex-col gap-5">
                                    <p className="text-primary text-lg text-wrap">
                                        🌠 {asteroidData.full_name.trim()}
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-primary">
                                            SPKID: {asteroidData.spkid}
                                        </p>
                                        <p className="text-primary flex gap-2">
                                            Near Earth Object: <span className={`text-md ${asteroidData.neo === "Y" ? "text-green" : "text-asteroid"}`}> {asteroidData.neo === "Y" ? "Yes" : "No"}</span>
                                        </p>
                                        <p className="text-primary flex gap-2">
                                            Potentially Hazardous Asteroid: <span className={`text-md ${asteroidData.pha === "Y" ? "text-asteroid" : "text-green"}`}> {asteroidData.pha === "Y" ? "Yes" : "No"}</span>
                                        </p>
                                        <p className="text-primary">
                                            Diameter: {asteroidData.diameter}
                                        </p>
                                        <p className="text-primary">
                                            Period: {asteroidData.per} days
                                        </p>
                                        <p className="text-primary">
                                            First Observation: {asteroidData.first_obs}
                                        </p>
                                        <p className="text-primary">
                                            Last observation: {asteroidData.last_obs}
                                        </p>
                                        <p className="text-primary">
                                            Absolute magnitude: {asteroidData.H}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            ) : (
                <p>No data was found</p>
            )}
        </>
    );
}
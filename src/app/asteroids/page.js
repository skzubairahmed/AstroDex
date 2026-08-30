"use client";

import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import PaginatedAsteroidTable from "../Components/AsteroidTable";
import { useState, useEffect } from "react";

export default function Asteroids() {
  let [neoData, setNeoData] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNeoData(){
      try{
        let res = await fetch("/api/neo");
        let data = await res.json();
        setNeoData(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      }catch(e){
        setNeoData([]);
        setLoading(false);
      }
    }

    getNeoData();
  }, []);

  if(loading){
    return(
      <div className="bg-bg-primary m-0 p-0 flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
        <p className="text-text-primary text-xl font-mono animate-pulse">
          FETCHING DATA...
        </p>
      </div>
    );
  }

  return (
    <div className="p-0 m-0 w-screen flex flex-col h-screen bg-bg-primary overflow-hidden">
      <Navbar />
      <div className="flex md:flex-row flex-1 overflow-hidden">
        <SideBar />
        <main className="w-full flex-1 min-h-1 flex flex-col p-4 overflow-y-auto pb-24">
          <div className="flex w-full flex-col gap-3">
            <div className="w-full h-full border border-satellite/20 flex flex-col gap-4 rounded-lg p-3">
              <p className="text-text-primary font-bold text-lg">
                🌠 Asteroids
              </p>
              {
                neoData.length > 0 ? (
                  <PaginatedAsteroidTable asteroids={neoData} itemsPerPage={10} />
                ) : (
                  <p className="text-zinc-400 text-sm">No asteroid data available.</p>
                )
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";

export default function NasaApod() {
  let [apod, setApod] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getApod(){
      try{
        let res = await fetch("/api/apod");
        let data = await res.json();
        setApod(data);
        setLoading(false);
      }catch(e){
        setApod(null);
      }
    }

    getApod();
  }, [])

  if(loading){
    return(
      <div className="bg-bg-primary m-0 p-0 flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
        <p className="text-text-primary text-xl font-mono animate-pulse">
          FETCHING DATA...
        </p>
      </div>
    )
  }
  return (
    <>
      <div className="p-0 m-0 w-screen flex flex-col h-screen bg-bg-primary overflow-hidden">
        <Navbar />
        <div className="flex md:flex-row flex-1 overflow-hidden">
          <SideBar />
          <main className="w-full flex-1 min-h-1 flex flex-col p-4 overflow-y-auto pb-24">
            <div className="flex w-full flex-col gap-3">
              <div className="w-full h-fit border-1 border-satellite/20 rounded-lg p-4 flex flex-col gap-3">
                <p className="text-text-primary font-bold text-lg text-wrap">
                  🖼️ NASA Astronomy Picture Of the Day: {apod.title}
                </p>
                <div className="w-full h-fit flex justify-center">
                  <div className="w-fit h-fit border-2 border-satellite/20 hover:border-satellite transition-color rounded-lg">
                    <Link href={apod.url} target="_blank" rel="noopener noreferrer">
                      <img 
                      src={apod.url}
                      className="rounded-lg"
                      />
                    </Link>
                  </div>
                </div>
                <div className="w-full h-fit border-1 border-satellite/20 rounded-xl p-3">
                  <p className="text-text-primary">
                    <b>Date:</b> {apod.date}
                  </p>

                  <p className="text-text-primary">
                    <b>Copyright:</b> {apod.copyright}
                  </p>
                  <br/>
                  <p className="text-text-primary">
                    <b>Explanaition:</b> <br/>{apod.explaination}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
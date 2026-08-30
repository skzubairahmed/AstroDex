//MAIN PAGE
"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";

export default function Home() {
  let [bookmarks, setBookmarks] = useState([]);
  let [apod, setApod] = useState(null);
  let [loading, setLoading] = useState(true);
  let [neo, setNeo] = useState(true);

  function clearBookmarks(){
    if(typeof window !== "undefined"){
      setBookmarks([]);
      window.localStorage.setItem("bookmarks", []);
    }
  }

  useEffect(() => {
    function getBookmarks(){
      if (typeof window !== "undefined") {
        const localStorage = window.localStorage;
        let saved = localStorage.getItem("bookmarks");
        if(saved){
          try{
            const parsed = JSON.parse(saved);
            setBookmarks(Array.isArray(parsed) ? parsed : []);
          }catch(e){
            setBookmarks([]);
          }
        }
      }
    }
    
    async function getApod(){
      try{
        let res = await fetch("/api/apod");
        let data = await res.json();
        setApod(data);
        setLoading(false);
      }catch(e){
        setApod(null);
        setLoading(false);
      }
    }

    getBookmarks();
    getApod();
  }, []);
  
  if(loading){
    return(
      <div className="p-0 m-0 w-screen flex flex-col h-screen bg-bg-primary overflow-hidden items-center justify-center">
        <p className="text-text-primary text-xl font-mono animate-pulse">
          FETCHING DATA...
        </p>
      </div>
    );
  }

  return(
    <div className="p-0 m-0 w-screen flex flex-col h-screen bg-bg-primary overflow-hidden">
      <Navbar />
      <div className="flex md:flex-row flex-1 overflow-hidden">
        <SideBar />
        <main className="w-full flex-1 min-h-1 flex flex-col p-4 overflow-y-auto pb-24">
          <div className="flex w-full flex-col gap-3">
            <div className="w-full h-fit flex flex-col md:flex-row gap-4">
            
              <div className="bg-card-surface border border-satellite/20 p-4 w-full rounded-xl h-83 flex flex-col gap-4 overflow-hidden shadow-lg">
                <div className="overflow-hidden flex flex-row gap-2 items-center">
                  <p className="text-lg text-text-primary font-bold">
                    Bookmarks
                  </p>
                  <button className="border-1 border-satellite px-2 py-1 w-fit h-fit rounded-lg" onClick={() => clearBookmarks()}>
                    CLEAR
                  </button>
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px]">
                  {
                    bookmarks && bookmarks.length > 0 ? (
                      bookmarks.map((item, index) => {
                        const linkHref = typeof item === "object" && item !== null ? item.link : `${item}`;
                        const itemName = typeof item === "object" && item !== null ? `${item.icon || ""} ${item.name || ""}` : item;
                        
                        return(
                          <Link key={index} href={linkHref}>
                            <div className="w-full p-3 rounded-lg border border-satellite/20 bg-bg-primary/40 hover:border-satellite transition-colors">
                              <p className="text-md text-text-primary font-mono">
                                {itemName}
                              </p>
                            </div>
                          </Link>
                        )
                      })
                    ) : (
                      <p className="text-md text-text-secondary">
                        No bookmarks saved.
                      </p>
                    )
                  }
                </div>
              </div>

              <div className="bg-card-surface border border-satellite/20 p-4 w-full rounded-xl h-83 flex flex-col gap-4 overflow-hidden shadow-lg">
                <div className="flex flex-col gap-3">
                  <p className="text-lg text-text-primary font-bold">
                    🖼️ NASA APOD: {apod?.title || "Astronomy Picture"} (PREVIEW)
                  </p>
                  {apod?.url && (
                    <div className="w-full h-64 overflow-hidden rounded-lg relative border border-satellite/20">
                      <img
                        alt={apod.title || "APOD"}
                        src={apod.url}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className="w-full h-90 bg-card-surface border-1 rounded-lg border-satellite/20 px-3 py-2 flex flex-col gap-3">
              <p className="text-text-primary font-bold text-lg">
                Near Earth Objects (Random Selection)
              </p>
              
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
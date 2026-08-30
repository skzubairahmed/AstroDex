"use client"

import { useState, useEffect } from "react"

export default function PaginatedAsteroidTable({asteroids, itemsPerPage}){
    let [currentPage, setCurrentPage] = useState(1);
    let [bookmarks, setBookmarks] = useState([]);
    let totalPages = Math.ceil(asteroids.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = asteroids.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        if(typeof window !== "undefined"){
            let bookmarksToCheck = window.localStorage.getItem("bookmarks") ? JSON.parse(window.localStorage.getItem("bookmarks")) : [];
            setBookmarks(bookmarksToCheck);
        }
    }, []);

    function toggleBookmark(item){
        if(typeof window !== "undefined" && window.localStorage){
            try{
                const storedBookmarks = window.localStorage.getItem("bookmarks");
                let currentBookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];

                const exists = currentBookmarks.some(b => b.name === item.full_name);
                let updatedBookmarks;

                if (exists) {
                    updatedBookmarks = currentBookmarks.filter(b => b.name !== item.full_name);
                } else {
                    let bookmarkToAdd = {
                        "icon": "🌠",
                        "name": item.full_name,
                        "link": "/asteroids"
                    };
                    updatedBookmarks = [...currentBookmarks, bookmarkToAdd];
                }

                window.localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
                setBookmarks(updatedBookmarks);
            }catch(e){
                window.localStorage.setItem("bookmarks", JSON.stringify([]));
                setBookmarks([]);
            }
        }
    }

    return(
        <div className="w-full h-fit overflow-x-auto mx-auto p-3 text-text-primary bg-card-surface rounded-lg border border-satellite/20">
            <table className="text-left w-full border-collapse text-sm">
                <thead className="border-b-2 border-satellite/20">
                    <tr>
                        <th className="py-3 px-3 font-semibold">ID</th>
                        <th className="py-3 px-3 font-semibold">Name</th>
                        <th className="py-3 px-3 font-semibold">PHA</th>
                        <th className="py-3 px-3 font-semibold">Diameter</th>
                        <th className="py-3 px-3 font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-satellite/20 text-secondary/20">
                    {currentData.map((item) => {
                        const isBookmarked = bookmarks.some(bookmark => bookmark.name === item.full_name);
                        return(
                            <tr key={item.spkid} className="hover:bg-satellite/40 transition">
                                <td className="py-3 px-3">{item.spkid}</td>
                                <td className="py-3 px-3 font-medium text-white">{item.full_name}</td>
                                <td className="py-3 px-3">{item.pha}</td>
                                <td className="py-3 px-3">{item.diameter ? item.diameter+" km": "Not found"}</td>
                                
                                <td className="py-3 px-3">
                                    <button className="px-2 py-2 bg-satellite/30 border border-satellite rounded-lg" onClick={() => toggleBookmark(item)}>
                                        {
                                            isBookmarked ? <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F4F6"><path d="M713-600 600-713l56-57 57 57 141-142 57 57-198 198ZM200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Z"/></svg></span> : <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F4F6"><path d="M200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Zm400 160v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/></svg></span>
                                        }
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="w-full h-fit px-4 py-3 rounded-lg border-satellite/20 flex flex-row justify-center gap-2 items-center mt-4">
                <button onClick={() => setCurrentPage((p) => Math.max(p-1, 1))} disabled={currentPage === 1} className="rounded-lg border border-satellite px-3 py-2 disabled:opacity-50">
                    Prev
                </button>
                <div className="w-fit h-fit px-3 py-2 rounded-lg border border-satellite">
                    {currentPage}/{totalPages}
                </div>
                <button onClick={() => setCurrentPage((p) => Math.min(p+1, totalPages))} disabled={currentPage === totalPages} className="rounded-lg border border-satellite px-3 py-2 disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
    )
}
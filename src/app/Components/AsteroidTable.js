"use client"

import { useState } from "react"

export default function PaginatedAsteroidTable({asteroids, itemsPerPage}){
    let [currentPage, setCurrentPage] = useState(1);
    let totalPages = Math.ceil(asteroids.length / itemsPerPage);

    const startIndex = (currentPage - 1) * 10;
    const currentData = asteroids.slice(startIndex, startIndex + itemsPerPage);

    return(
        <div className="w-full h-fit overflow-x-auto mx-auto p-3 text-text-primary bg-card-surface rounded-lg border-1 border-satellite/20">
            <table className="text-left w-full border-collapse text-sm">
                <thead className="border-b border-2 border-satellite/20">
                    <tr>
                        <th className="py-3 px-3 font-semibold">ID</th>
                        <th className="py-3 px-3 font-semibold">Name</th>
                        <th className="py-3 px-3 font-semibold">PHA</th>
                        <th classname="py-3 px-3 font-semibold">Diameter</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-satellite/20 text-secondary/20">
                    {currentData.map((item) => (
                        <tr key={item.spkid} className="hover:bg-satellite/40 transition">
                            <td className="py-3 px-3">{item.spkid}</td>
                            <td className="py-3 px-3 font-medium text-white">{item.full_name}</td>
                            <td className="py-3 px-3">{item.pha}</td>
                            <td className="py-3 px-3">{item.diameter ? item.diameter+" km": "Not found"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="w-full h-fit px-4 py-3 rounded-lg border-satellite/20 flex flex-row justify-center gap-2">
                <button onClick={() => {setCurrentPage((p) => Math.max(p-1, 1))}} disabled={currentPage === 1} className=" rounded-lg border-1 border-satellite px-3 py-2 hover:pointer">
                    Prev
                </button>
                <div className="w-fit h-fit px-3 py-2 rounded-lg border-1 border-satellite">
                    {currentPage}/{totalPages}
                </div>
                <button onClick={() => {setCurrentPage((p) => Math.min(p+1, totalPages))}} disabled={currentData === totalPages} className="rounded-lg border-1 border-satellite px-3 py-2 hover:pointer">
                    Next
                </button>
            </div>
        </div>
    )
}
import { useState, useEffect } from "react";

export default function PreviewAsteroidsTable(){
    const asteroids = [
        {
            "_id": {
                "$oid": "6a936f1f4ef7df7a33c01e4a"
            },
            "spkid": 20000719,
            "full_name": "   719 Albert (A911 TB)",
            "neo": "Y",
            "pha": "N",
            "diameter": null,
            "per": 1560,
            "first_obs": "1911-10-04",
            "last_obs": "2026-05-22",
            "H": 15.59
        },
        {
            "_id": {
                "$oid": "6a936f1f4ef7df7a33c01e6b"
            },
            "spkid": 20002368,
            "full_name": "  2368 Beltrovata (1977 RA)",
            "neo": "Y",
            "pha": "N",
            "diameter": 2.3,
            "per": 1120,
            "first_obs": "1977-09-04",
            "last_obs": "2026-08-27",
            "H": 15.18
        },
        {
            "_id": {
                "$oid": "6a936f1f4ef7df7a33c01e51"
            },
            "spkid": 20001627,
            "full_name": "  1627 Ivar (1929 SH)",
            "neo": "Y",
            "pha": "N",
            "diameter": 9.12,
            "per": 929,
            "first_obs": "1929-09-25",
            "last_obs": "2026-08-24",
            "H": 12.79
        },
        {
            "_id": {
                "$oid": "6a936f1f4ef7df7a33c01f6a"
            },
            "spkid": 20053430,
            "full_name": " 53430 (1999 TY16)",
            "neo": "Y",
            "pha": "N",
            "diameter": 1.233,
            "per": 1110,
            "first_obs": "1999-10-13",
            "last_obs": "2026-07-30",
            "H": 16.66
        },
        {
            "_id": {
                "$oid": "6a936f1f4ef7df7a33c01e6f"
            },
            "spkid": 20003122,
            "full_name": "  3122 Florence (1981 ET3)",
            "neo": "Y",
            "pha": "Y",
            "diameter": 4.9,
            "per": 859,
            "first_obs": "1979-03-09",
            "last_obs": "2026-08-18",
            "H": 14.08
        },
    ]

    return(
        <table className="text-left border-collapse w-full text-sm">
            <thead className="border-b-2 border-satellite/20">
                    <tr>
                        <th className="py-3 px-3 font-semibold">ID</th>
                        <th className="py-3 px-3 font-semibold">Name</th>
                        <th className="py-3 px-3 font-semibold">PHA</th>
                        <th className="py-3 px-3 font-semibold">Diameter</th>
                    </tr>
                </thead>
            <tbody className="divide-y divide-satellite/20 text-secondary/20">
                {
                    asteroids.map((asteroid) => {
                        return(
                            <tr className="hover:bg-satellite/40 transition-colors" key={asteroid.spkid}>
                                <td className="px-3 py-2">{asteroid.spkid}</td>
                                <td className="px-3 py-2">{asteroid.full_name}</td>
                                <td className="px-3 py-2">{asteroid.pha}</td>
                                <td className="px-3 py-2">{asteroid.diameter !== null ? asteroid.diameter + " km" : "Not found"}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
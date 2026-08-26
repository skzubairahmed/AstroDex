import Link from "next/link";

export default function Navbar(){
    return(
        <div className="container bg-white w-screen p-3 flex flex-row justify-between">
            <div className="nav-title">
                <p className="text text-black text-2xl">
                    AstroDex
                </p>
            </div>
        </div>
    )
}
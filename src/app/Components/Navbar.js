import Link from "next/link";

export default function Navbar(){
    return(
        <div className="w-screen bg-bg-primary/90 backdrob-blur-md border-b border-2 sticky border-text-secondary/10 p-3 flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-0">
            <div className="nav-title">
                <p className="text text-primary text-2xl">
                    [AstroDex]
                </p>
            </div>

            <div className="flex search-bar">
                <div className="flex flex-row gap-2">
                    <input className="input bg-card-surface text-primary rounded p-2" placeholder="Search" type="search" />
                    <button className="button rounded border-1 border-text-primary px-2 py-1 text-black hover:cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F4F6"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
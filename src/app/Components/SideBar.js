import Link from "next/link"

export default function SideBar(current){
    return(
        <>
            <aside className="hidden md:flex flex-col bg-card-surface border-r border-satellite/20 w-64 p-2 h-[calc(100vh-4.2rem)] overflow-hidden top-0 left-0 z-50">
                <div className="h-full w-full flex flex-col gap-4">
                    <Link href="/" className="w-full h-fit items-center p-2 text-2xl flex flex-row text-primary gap-2">
                        🏠 Home
                    </Link>
                    <Link href="/satelittes" className="w-full h-fit items-center p-2 text-2xl flex flex-row text-primary gap-2">
                        🛰️ Satelittes
                    </Link>
                    <Link href="/exoplanets" className="w-full h-fit items-center p-2 text-2xl flex flex-row text-primary gap-2">
                        🪐 Exoplanets
                    </Link>
                    <Link href="/asteroids" className="w-full h-fit items-center p-2 text-2xl flex flex-row text-primary gap-2">
                        🌠 Asteroids
                    </Link>
                    <Link href="/tracker" className="w-full h-fit items-center p-2 text-2xl flex flex-row text-primary gap-2">
                        📡 Tracker
                    </Link>
                    <Link href="/nasa-apod" className="w-full h-fit items-center p-2 text-2xl flex flex-row text-primary gap-2">
                        🖼️ NASA APOD
                    </Link>
                </div>
            </aside>

            <div className="flex flex-row md:hidden fixed justify-center items-center gap-4 bottom-0 w-screen p-3 bg-card-surface border-t border-satellite/20">
                <Link className="rounded p-2 text-md text-center border border-satellite/30" href="/">
                    🏠
                </Link>
                <Link className="rounded p-2 text-md text-center border border-satellite/30" href="/satelittes">
                    🛰️
                </Link>
                <Link className="rounded p-2 text-md text-center border border-satellite/30" href="/exoplanets">
                    🪐
                </Link>
                <Link className="rounded p-2 text-md text-center border border-satellite/30" href="/asteroids">
                    🌠
                </Link>
                <Link className="rounded p-2 text-md text-center border border-satellite/30" href="/tracker">
                    📡
                </Link>
                <Link className="rounded p-2 text-md text-center border border-satellite/30" href="/nasa-apod">
                    🖼️
                </Link>
            </div>
        </>
    )
}
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";

export default function Exoplanets() {
  return (
    <>
      <div className="p-0 m-0 w-screen flex flex-col h-screen bg-bg-primary overflow-hidden">
        <Navbar />
        <div className="flex md:flex-row flex-1 overflow-hidden">
          <SideBar />
          <main className="w-full h-full flex-col p-2 overflow-y-auto">
           
          </main>
        </div>
      </div>
    </>
  );
}
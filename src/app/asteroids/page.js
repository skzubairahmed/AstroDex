import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";

export default function Home() {
  return (
    <>
      <div className="p-0 m-0 w-screen h-screen bg-bg-primary">
        <Navbar />
        <SideBar />
      </div>
    </>
  );
}

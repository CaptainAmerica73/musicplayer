//import { useEffect, useState } from "react";
import List from "./list";
import Navbar from "./navbar";

export default function Home() {
  return (
    <>
      <div className="flex absolute inset-0 -z-10 text-white bg-slate-400 h-screen w-screen overflow-hidden">
        <Navbar />
        <List />
      </div>
    </>
  );
}

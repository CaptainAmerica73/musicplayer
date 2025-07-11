import Recent from "./recent";
import { useState } from "react";

export default function Navbar() {
  const [searchCheck, setSearchCheck] = useState(false);
  const [search, setSearch] = useState("");
  const handle = (event) => {
    setSearch(event.target.value);
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col font-comfortaa m-[0.7vw] mr-[0.4vw] h-[max(15vw,120px)] text-[max(1.5vw,10px)] w-[max(20vw,100px)] bg-slate-600 rounded-[max(1vw,0.6rem)]">
          <div className="p-[1vw] rounded-t-[max(1vw,0.6rem)] cursor-pointer w-full h-1/3 hover:bg-slate-500 flex gap-[1vw] items-center">
            <i className="fa-solid fa-house"></i>
            <div className="">Home</div>
          </div>
          <div
            onClick={() => {
              setSearchCheck(!searchCheck);
            }}
            className="peer/search p-[1vw] w-full h-1/3 cursor-pointer hover:bg-slate-500 flex gap-[1vw] items-center"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <div className="">Search</div>
          </div>
          <div
            className={` h-[6vh] w-[30vw] flex left-[45vw] absolute transition-transform items-center ${
              searchCheck ? "translate-y-[3vw]" : "-translate-y-[200%]"
            }`}
          >
            <input
              className="peer/check focus:bg-slate-300 focus:outline-none focus:ring-2 pl-4 focus:ring-blue-300 rounded-2xl bg-slate-800 h-full w-full"
              type="text"
              id="search"
              value={search}
              onChange={handle}
            ></input>
            <label
              htmlFor="search"
              className={`peer-focus/check:-translate-y-[5.5vh] peer-focus/check:text-base text-lg absolute transition-transform ease-in-out duration-1000 left-2 ${
                search ? "-translate-y-[5.5vh] text-base" : ""
              }`}
            >
              Search
            </label>
          </div>
          <div className="p-[1vw] rounded-b-[max(1vw,0.6rem)] w-full h-1/3 cursor-pointer hover:bg-slate-500 flex gap-[1vw] items-center">
            <i className="fa-solid fa-heart"></i>
            <div className="">Favourite</div>
          </div>
        </div>
        <Recent />
      </div>
    </>
  );
}

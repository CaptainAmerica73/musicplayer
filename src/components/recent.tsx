import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, usercol } from "../Config";
import { User } from "firebase/auth";

export default function Recent() {
  const [recent, setRecent] = useState(Array<object>);

  const retrieveData = (user: User) => {
    const unsubscribe = onSnapshot(
      collection(usercol, user.uid, "recents"),
      (snapshot) => {
        const recentUpdated: object[] = [];
        snapshot.forEach((doc) => {
          recentUpdated.push(doc.data());
        });
        recentUpdated.sort((a, b) => b["time"].seconds - a["time"].seconds);
        setRecent(recentUpdated.slice(0, 10));
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    let dataunsubscribe: Unsubscribe;
    const authunsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (dataunsubscribe) dataunsubscribe();
        dataunsubscribe = retrieveData(user);
      } else {
        setRecent([]);
        if (dataunsubscribe) dataunsubscribe;
      }
    });
    return () => {
      if (authunsubscribe) authunsubscribe();
      if (dataunsubscribe) dataunsubscribe();
    };
  }, []);

  return (
    <>
      <div className="sbar flex flex-col font-comfortaa bg-slate-600 rounded-[max(1vw,0.6rem)] w-[max(20vw,100px)] h-full overflow-y-scroll overflow-x-hidden m-[0.7vw] mt-[0.4vw] mr-[0.4vw]">
        {recent.map((song, index) => {
          return (
            <div
              key={index}
              className="flex w-full rounded-xl cursor-pointer hover:bg-slate-500 transition-all p-[0.4vw] my-[1vh] first-of-type:mt-[2vh]"
            >
              <img className="size-[4vw] rounded-lg" src={song["img"]}></img>
              <a
                className="flex flex-col justify-center text-[max(1.5vw,10px)] items-start mx-[1vw] text-nowrap"
                href={song["path"]}
              >
                {song["name"]}
                <p className="flex text-left text-[max(0.7vw,7px)] overflow-hidden">
                  {song["artist"]}
                </p>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}

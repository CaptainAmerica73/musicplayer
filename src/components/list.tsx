import { useEffect, useState } from "react";
import MusicPlayer from "./musicplayer";
import UpperNavBar from "./uppernavbar";
import { doc, onSnapshot, setDoc, Unsubscribe } from "firebase/firestore";
import { auth, songcol, usercol } from "../Config";

export default function List() {
  const [play, setPlay] = useState<object>();
  const [songs_list, setSongs] = useState<Array<object>>([]);
  const [toggle, setToggle] = useState(false);

  const handleRecent = (song) => {
    if (auth.currentUser && usercol) {
      setDoc(doc(usercol, auth.currentUser.uid, "recents", song["name"]), {
        ...song,
        time: new Date(),
      });
    } else {
      console.log("error");
    }
  };

  const retrieveData = () => {
    const unsubscribe = onSnapshot(songcol, (snapshot) => {
      if (auth.currentUser) {
        const updatedSongs: object[] = [];
        snapshot.forEach((doc) => {
          updatedSongs.push(doc.data());
        });
        console.log(updatedSongs);
        setSongs(updatedSongs);
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    let dataunsubscribe: Unsubscribe;
    const authunsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (dataunsubscribe) dataunsubscribe();
        dataunsubscribe = retrieveData();
      } else {
        setSongs([]);
        if (dataunsubscribe) dataunsubscribe;
      }
    });
    return () => {
      authunsubscribe();
      dataunsubscribe();
    };
  }, []);

  return (
    <>
      <div className="sbar bg-slate-600 m-[0.7vw] ml-[0.4vw] w-[80vw] rounded-[max(1vw,0.6rem)] overflow-y-scroll">
        <UpperNavBar {...{ toggle, setToggle }} />
        <div className="flex flex-wrap justify-center h-[18vw]">
          {songs_list.map((song, index) => (
            <div
              key={index}
              onClick={() => {
                setPlay(song);
                handleRecent(song);
                setToggle(true);
              }}
              className="flex basis-[max(18%,100px)] h-[max(100%,130px)] z-2 m-[0.5vw] hover:scale-[105%] transition-all bg-slate-500 rounded-lg hover:bg-slate-400 flex-col justify-center items-center w-[100%] p-2 cursor-pointer"
            >
              <img
                className="h-[70%] w-[90%] rounded-[max(1vw,0.6rem)]"
                src={song["img"]}
              ></img>
              <p className="h-[20%] p-1 text-[max(1.5vw,10px)] w-[10vw] text-nowrap font-comfortaa truncate">
                {song["name"]}
              </p>
              <p className="h-[10%] w-[10vw] text-nowrap text-[max(1vw,7px)] font-comfortaa truncate">
                {song["artist"]}
              </p>
            </div>
          ))}
        </div>
      </div>
      {play ? (
        <MusicPlayer song={play} toggle={toggle} songs_list={songs_list} />
      ) : (
        <></>
      )}
    </>
  );
}

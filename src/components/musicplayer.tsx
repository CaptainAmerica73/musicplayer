import { useRef, useState, useEffect } from "react";
import { storage } from "../Config";
import { getDownloadURL, ref } from "firebase/storage";

export default function MusicPlayer(props) {
  const currentTrack = useRef(document.createElement("audio"));
  const slider = useRef<HTMLInputElement>(null);
  const [currentSong, setcurrentSong] = useState(props.song);

  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const animation = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setcurrentTime] = useState(0);
  const [totalTime, settotalTime] = useState(0);

  const timeout = (time: number) => {
    return new Promise((res) => {
      setInterval(res, time);
    });
  };

  const isLooping = () => {
    if (loop === true) currentTrack.current.loop = true;
    else currentTrack.current.loop = false;
  };

  const isShuffling = () => {
    if (shuffle === true) {
      setcurrentSong(props.songs_list[Math.random() * props.songs_list.length]);
    } else currentTrack.current.addEventListener("ended", nextTrack);
  };

  const getURL = async (path) => {
    return getDownloadURL(ref(storage, `Songs/${path}`))
      .then((url) => {
        return url;
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (props.song.path !== currentSong.path) {
      setcurrentSong(props.song);
    }
  }, [props.song]);

  useEffect(() => {
    const fun = async () => {
      if (slider.current) {
        slider.current.value = "0";
        await getURL(currentSong.path).then((url) => {
          if (url) currentTrack.current.src = url;
        });
        Array.from(document.getElementsByClassName("animate-text")).forEach(
          (item) => {
            console.log(item);
            item.classList.remove("animate-text");
            item.classList.add("animate-text");
          }
        );

        setcurrentTime(0);
        settotalTime(0);
        currentTrack.current.load();
        await timeout(5000);
        settotalTime(currentTrack.current.duration);
        currentTrack.current.play();
        setPlaying(true);
        currentTrack.current.addEventListener("ended", nextTrack);
        animation.current = requestAnimationFrame(handleCurrentTime);
      }
    };
    fun();
  }, [currentSong]);

  const nextTrack = () => {
    console.log(currentSong);
    setcurrentSong(props.songs_list[props.songs_list.indexOf(currentSong) + 1]);
    console.log(currentSong);
  };

  const previousTrack = () => {
    setcurrentSong(props.songs_list[props.songs_list.indexOf(currentSong) - 1]);
  };

  const formatTime = (time: number) => {
    return (
      ("0" + Math.floor(time / 60)).slice(-2) +
      ":" +
      ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const handlePlay = () => {
    setPlaying(!playing);
    if (playing) {
      currentTrack.current.pause();
      cancelAnimationFrame(animation.current);
    } else {
      currentTrack.current.play();
      animation.current = requestAnimationFrame(handleCurrentTime);
    }
  };

  const handleCurrentTime = () => {
    if (slider.current) {
      slider.current.valueAsNumber = Math.floor(
        currentTrack.current.currentTime
      );
      setcurrentTime(currentTrack.current.currentTime);
      animation.current = requestAnimationFrame(handleCurrentTime);
    }
  };

  const handleSlider = () => {
    if (slider.current) {
      currentTrack.current.currentTime = slider.current.valueAsNumber;
      setcurrentTime(slider.current.valueAsNumber);
    }
  };

  return (
    <>
      <div
        className={`bg-slate-400 h-[15vh] w-[100vw] text-[max(1.5vw,15px)] flex items-center justify-center transition-transform duration-500 bottom-0 absolute ${
          currentSong && props.toggle ? "" : "translate-y-40"
        } `}
      >
        <div className="absolute flex items-center left-[2vw]">
          <img
            className="w-[7vw] h-[7vw] rounded-full"
            src={currentSong.img}
          ></img>
          <div className="overflow-hidden flex flex-col justify-center items-center w-[max(10vw,100px)] ml-[2vw]">
            <p
              className={`w-max px-[1vw] translate-x-0 text-nowrap ${
                currentSong.name.length > Math.round(window.innerWidth / 110)
                  ? "animate-text"
                  : ""
              }`}
            >
              {currentSong.name}
            </p>
            <p
              className={`w-full px-[1vw] text-nowrap ${
                currentSong.artist.length > Math.round(window.innerWidth / 110)
                  ? "translate-x-0 animate-text"
                  : ""
              }`}
            >
              {currentSong.artist}
            </p>
          </div>
        </div>
        <div className="ml-[100px] xl:ml-[2vw] flex flex-col items-center">
          <div className="flex gap-[2vw]">
            <div className="">{formatTime(currentTime)}</div>
            <input
              type="range"
              min="0"
              max={totalTime}
              ref={slider}
              defaultValue={0}
              className="w-[30vw]"
              onChange={handleSlider}
            ></input>
            <div className="">{formatTime(totalTime)}</div>
          </div>
          <div className="h-[40%] text-[max(2vw,20px)] flex items-center translate-y-[2vh]">
            <div
              className="mx-[3vw] hover:scale-[1.3] transition-all   "
              onClick={() => {
                setLoop(!loop);
                isLooping();
              }}
            >
              <i className="fa-solid fa-repeat"></i>
            </div>
            <div
              className="mx-[3vw] hover:scale-[1.3] transition-all"
              onClick={previousTrack}
            >
              <i className="fa-solid fa-backward-step"></i>
            </div>
            <div
              className="mx-[3vw] text-[max(2.5vw,30px)] hover:scale-[1.3] transition-all"
              onClick={handlePlay}
            >
              {playing ? (
                <i className="fa-solid fa-circle-pause"></i>
              ) : (
                <i className="fa-solid fa-circle-play"></i>
              )}
            </div>
            <div
              className="mx-[3vw] hover:scale-[1.3] transition-all"
              onClick={nextTrack}
            >
              <i className="fa-solid fa-forward-step"></i>
            </div>
            <div
              className="mx-[3vw]"
              onClick={() => {
                setShuffle(!shuffle);
                isShuffling();
              }}
            >
              <i className="fa-solid fa-shuffle hover:scale-[1.3] transition-all"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

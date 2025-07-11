import { signOut } from "firebase/auth";
import { auth } from "../Config";
import LoginPage from "./loginpage";
import { useState } from "react";

export default function UpperNavBar(props) {
  const [toggle, setToggle] = useState(false);

  function Logout() {
    if (auth.currentUser) {
      signOut(auth)
        .then(() => {
          props.setToggle(false);
          alert("Signed Out Successfully!");
        })
        .catch((error) => alert(error));
    }
  }

  return (
    <>
      <div className="flex relative w-full rounded-lg h-[7vh] items-center font-comfortaa my-[1vw]">
        <div className="absolute flex mx-[2vw] items-center">
          <img
            src="https://t4.ftcdn.net/jpg/05/52/12/69/240_F_552126996_gsaT9fP7rRrX4SkZzYxvQPYXr9Vn1YMD.jpg"
            className="rounded-full m-[1vw] size-[max(4vw,30px)]"
          ></img>
          <p className="text-[max(2vw,20px)]">TuneHub</p>
        </div>
        <div className="flex absolute right-[max(15vw,80px)] items-center justify-center text-[max(1.2vw,10px)] w-[max(8vw,50px)] h-[5vh] ml-[36vw] rounded-3xl cursor-pointer bg-slate-500">
          {auth.currentUser ? (
            <div onClick={Logout}>Logout</div>
          ) : (
            <div onClick={() => setToggle(true)}>Login</div>
          )}
        </div>
        <div
          className="flex absolute right-[max(5vw,20px)] items-center justify-center text-[max(1.2vw,10px)] w-[max(8vw,50px)] h-[5vh] ml-[2vw] rounded-3xl cursor-pointer bg-slate-500"
          onClick={() => setToggle(true)}
        >
          Signup
        </div>
      </div>

      <LoginPage {...{ toggle, setToggle }} />
    </>
  );
}

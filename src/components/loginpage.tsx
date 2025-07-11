import SignupEmail from "./signup/email";
import SignupPassword from "./signup/password";
import SignupUsername from "./signup/username";
import LoginUsername from "./login/username";
import LoginEmail from "./login/email";
import LoginPassword from "./login/password";
import { useState } from "react";
import Toggle from "./toggle";
import LoginButton from "./login/button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, usercol } from "../Config";
import SignupButton from "./signup/button";
import { setDoc, doc } from "firebase/firestore";

export default function LoginPage(props) {
  const [toggle, setToggle] = useState(false);
  const [login, setLogin] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: {
      password1: "",
      password2: "",
    },
  });

  const handlingLogin = (event) => {
    setLogin((item) =>
      event.target.id === "loginusername"
        ? { ...item, username: event.target.value }
        : event.target.id === "loginemail"
        ? { ...item, email: event.target.value }
        : { ...item, password: event.target.value }
    );
  };

  const handlingSignup = (event) => {
    setSignup((item) =>
      event.target.id === "signupusername"
        ? { ...item, username: event.target.value }
        : event.target.id === "signupemail"
        ? { ...item, email: event.target.value }
        : event.target.id === "signuppassword1"
        ? {
            ...item,
            password: { ...item.password, password1: event.target.value },
          }
        : {
            ...item,
            password: { ...item.password, password2: event.target.value },
          }
    );
  };

  const LoginSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, login.email, login.password)
      .then((user) => {
        alert("Hello " + user.user.displayName);
      })
      .catch((error) => {
        alert(error);
      });
    event.target.reset();
    props.setToggle(false);
  };

  const SignupSubmit = (event) => {
    event.preventDefault();
    if (signup.password.password1 === signup.password.password2) {
      createUserWithEmailAndPassword(
        auth,
        signup.email,
        signup.password.password1
      )
        .then((usercred) => {
          setDoc(doc(usercol, usercred.user.uid), {
            Email: signup.email,
            Password: signup.password.password1,
            Username: signup.username,
          });
          updateProfile(usercred.user, {
            displayName: signup.username,
          });
          alert("Welcome To TuneHub!!!");
          props.setToggle(false);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <>
      <div
        className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
          props.toggle ? "translate-y-0" : "-translate-y-[100vh]"
        }`}
      >
        <div className="box-border font-comfortaa m-0 h-[100vh] w-[100vw] bg-gradient-to-tr from-teal-500 from-10% via-cyan-700 via-45% to-teal-500 to-90% flex items-center justify-center">
          <div className="relative h-[max(40vw,300px)] w-[max(60vw,350px)] bg-transparent rounded-[max(1vw,0.5rem)]">
            <div
              className={`absolute flex flex-col items-center justify-center gap-y-[7%] h-full z-[1] w-1/2 transition-all duration-[600ms] ease-in-out bg-white ${
                toggle
                  ? "translate-x-full rounded-e-[max(1vw,0.5rem)] opacity-20"
                  : "translate-x-0 rounded-s-[max(1vw,0.5rem)]"
              } `}
            >
              <form
                onSubmit={SignupSubmit}
                className="flex flex-col h-full gap-y-[4%] justify-center items-center"
              >
                <div className="text-[max(2.5vw,15px)] font-comfortaa font-bold text-black">
                  Signup
                </div>
                <SignupUsername value={signup.username} set={handlingSignup} />
                <SignupEmail value={signup.email} set={handlingSignup} />
                <SignupPassword value={signup.password} set={handlingSignup} />
                <SignupButton />
              </form>
            </div>
            <div
              className={`absolute flex flex-col items-center justify-center gap-y-[7%] h-full w-1/2 transition-all duration-[600ms] ease-in-out bg-white ${
                toggle
                  ? "translate-x-full rounded-e-[max(1vw,0.5rem)] z-[2]"
                  : "translate-x-0 rounded-s-[max(1vw,0.5rem)] z-[0] opacity-20"
              } `}
            >
              <form
                onSubmit={LoginSubmit}
                className="flex flex-col h-full gap-y-[4%] justify-center items-center"
              >
                <div className="text-[max(2.5vw,15px)] font-comfortaa font-bold text-black">
                  Login
                </div>
                <LoginUsername value={login.username} set={handlingLogin} />
                <LoginEmail value={login.email} set={handlingLogin} />
                <LoginPassword value={login.password} set={handlingLogin} />
                <LoginButton />
              </form>
            </div>

            <div
              className={`absolute bg-[#f51717] right-0 z-[5] h-full w-1/2 overflow-hidden transition-all ease-in-out duration-[600ms] ${
                toggle
                  ? "-translate-x-full rounded-s-[max(1vw,0.5rem)]"
                  : "translate-x-0 rounded-e-[max(1vw,0.5rem)]"
              }`}
            >
              <Toggle
                toggle={toggle}
                set={(value: boolean) => setToggle(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

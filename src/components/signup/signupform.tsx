import Username from "./username";
import Email from "./email";
import Password from "./password";
import Button from "./button";
import { auth, usercol } from "../../Config";
import { SetStateAction, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password1: "",
    password2: "",
  });

  function submit(event) {
    event.preventDefault();
    if (password.password1 === password.password2) {
      createUserWithEmailAndPassword(auth, email, password.password1)
        .then((usercred) => {
          setDoc(doc(usercol, usercred.user.uid), {
            Email: email,
            Password: password.password1,
            Username: username,
          });
          updateProfile(usercred.user, {
            displayName: username,
          });
          alert("Welcome To TuneHub!!!");
          nav("/..", { replace: true });
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  return (
    <>
      <form
        onSubmit={submit}
        className="flex flex-col gap-10 items-center h-screen w-screen bg-slate-600 py-10 "
      >
        <Username
          set={(value: string) => setUsername(value)}
          value={username}
        />
        <Email set={(value: string) => setEmail(value)} value={email} />
        <Password
          set={(
            value: SetStateAction<{ password1: string; password2: string }>
          ) => setPassword(value)}
          value={password}
        />
        <Button children="Submit" />
      </form>
    </>
  );
}

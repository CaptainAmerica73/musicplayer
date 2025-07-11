export default function SignupPassword(props) {
  return (
    <>
      <div className="relative h-[max(3vw,30px)] w-[max(20vw,150px)] text-[max(1.2vw,12px)] flex items-center">
        <input
          className="focus:bg-slate-600 placeholder-white dark:bg-slate-800 focus:outline-none pl-4 rounded-[max(1vw,0.5rem)] bg-slate-400 text-white h-full w-full"
          onChange={props.set}
          type="password"
          id="signuppassword1"
          value={props.value.password1}
          placeholder="Password:"
        ></input>
      </div>
      <div className="relative h-[max(3vw,30px)] w-[max(20vw,150px)] text-[max(1.2vw,12px)] flex items-center">
        <input
          className="focus:bg-slate-600 placeholder-white dark:bg-slate-800 focus:outline-none pl-4 rounded-[max(1vw,0.5rem)] bg-slate-400 text-white h-full w-full"
          onChange={props.set}
          type="password"
          id="signuppassword2"
          value={props.value.password2}
          placeholder="Confirm Password:"
        ></input>
      </div>
    </>
  );
}

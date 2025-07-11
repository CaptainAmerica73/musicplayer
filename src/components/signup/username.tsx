export default function SignupUsername(props) {
  return (
    <>
      <div className="relative h-[max(3vw,30px)] w-[max(20vw,150px)] text-[max(1.2vw,12px)] flex items-center">
        <input
          className="focus:bg-slate-600 dark:bg-slate-800 placeholder-white focus:outline-none pl-4 rounded-[max(1vw,0.5rem)] bg-slate-400 text-white h-full w-full"
          onChange={props.set}
          type="text"
          id="signupusername"
          value={props.value}
          placeholder="Username:"
        ></input>
      </div>
    </>
  );
}

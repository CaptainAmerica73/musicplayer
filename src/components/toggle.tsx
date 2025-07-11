export default function Toggle(props) {
  return (
    <>
      <div
        className={`absolute right-0 flex flex-col gap-[2vh] h-full text-white w-full font-comfortaa font-bold items-center transition-all duration-[600ms] ease-in-out justify-center ${
          props.toggle ? " -translate-x-[200%]" : " translate-x-0 "
        }`}
      >
        <div className="text-[max(2.5vw,15px)]">Hello Listener</div>
        <div className="text-[max(1vw,10px)]">Already have an account?</div>
        <button
          onClick={() => props.set(!props.toggle)}
          className="border-[max(0.2vw,3px)] text-[max(2vw,15px)] px-[1.5vw] py-[1vh] rounded-[max(1vw,0.5rem)]"
        >
          Login
        </button>
      </div>
      <div
        className={`absolute right-0 flex flex-col gap-[2vh] h-full text-white w-full font-comfortaa font-bold items-center transition-all duration-[600ms] ease-in-out justify-center ${
          props.toggle ? "translate-x-0" : "translate-x-[200%]"
        }`}
      >
        <div className="text-[max(2.5vw,15px)]">Hello Listener</div>
        <div className="text-[max(1vw,10px)]">Create an account?</div>
        <button
          onClick={() => props.set(!props.toggle)}
          className="border-[max(0.2vw,3px)] text-[max(2vw,15px)] px-[max(1.5vw,10px)] py-[max(0.2vw,5px)] rounded-[max(1vw,0.5rem)]"
        >
          Signup
        </button>
      </div>
    </>
  );
}

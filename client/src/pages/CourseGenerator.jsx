import { useState } from "react";
import { IoSend } from "react-icons/io5";

const MAX_CHARS = 400;

export default function CourseGenerator() {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);

  const remaining = MAX_CHARS - text.length;
  const percentage = (text.length / MAX_CHARS) * 100;

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text.trim()) {
      alert("submitted")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key==='Enter' && !e.shiftKey){
      e.preventDefault()
      e.target.form.requestSubmit()
    }
  }
  const circumference = 2 * Math.PI * 10;
  const strokeDash = ((MAX_CHARS - remaining) / MAX_CHARS) * circumference;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16 font-mono">
      {/* GRID BACKGROUND*/}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* GLOW */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255, 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-2xl">
        {/* Main title */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-black text-white leading-none tracking-tighter mb-4 text-center"
          style={{
            fontFamily: "'Georgia', serif",
            letterSpacing: "-0.04em",
          }}
        >
          Hey
          <span
            className="text-transparent"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.3)",
            }}
          >
            {" "}user,
          </span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-zinc-400 text-base sm:text-lg mb-12 tracking-wide text-center">
          What are you planning to learn{" "}
          <span className="text-white">today?</span>
        </p>

        {/* FORM */}

        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div
            className="relative rounded-sm transition-all duration-300"
            style={{
              boxShadow: focused
                ? "0 0 0 1px rgba(255,255,255,0.15), 0 0 30px rgba(255,255,255,0.03)"
                : "0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            <textarea
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS) {
                  setText(e.target.value);
                }
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="e.g. I want to understand how transformers work in machine learning..."
              className="w-full bg-zinc-950 text-zinc-100 placeholder-zinc-700 text-sm leading-relaxed p-5 pb-4 outline-none rounded-sm"
              style={{
                resize: "none",
                minHeight: "160px",
                fontFamily: "inherit",
                caretColor: "white",
              }}
              rows={6}
            />
          </div>
          {/* BOTTOM BAR */}
          <div className="flex items-center justify-between mt-3 px-1">
            {/* CHARACTER COUNT */}
            <div className="flex items-center gap-2.5">
              <svg width="24" height="24" viewBox="0 0 24 24" className="-rotate-90">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke={
                    remaining < 30
                      ? remaining < 10
                        ? "#ef4444"
                        : "#f59e0b"
                      : "rgba(255,255,255,0.8)"
                  }
                  strokeWidth="2"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - strokeDash}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.2s ease, stroke 0.2s ease" }}
                />
              </svg>
              <span
                className="text-xs tabular-nums transition-colors duration-200"
                style={{
                  color:
                    remaining < 10
                      ? "#ef4444"
                      : remaining < 30
                      ? "#f59e0b"
                      : "rgba(255,255,255,0.25)",
                }}
              >
                {remaining}
              </span>
            </div>
            {/* SUBMIT BUTTON */}
            <button
              // onClick={handleSubmit}
              type="submit"
              disabled={!text.trim()}
              className="relative overflow-hidden px-2.5 py-1.5 text-xs tracking-widest uppercase font-bold transition-all duration-200 rounded-sm"
              style={{
                background: "white",
                color: "black",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: text.trim() ? "pointer" : "not-allowed",
              }}
            >
              <IoSend size={25} />
            </button>
          </div>
        </form>

        {/* FOOTER */}
        <p className="text-[#ffffffa0] text-xs mt-10 tracking-widest text-center uppercase">
          MADE BY 1304-PK
        </p>
      </div>
    </div>
  );
}
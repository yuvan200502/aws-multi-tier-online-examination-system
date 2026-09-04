import { useEffect, useState } from "react";

export default function Timer({ minutes, onFinish }) {
  const [seconds, setSeconds] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval);
          onFinish();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="timer">
      ⏱ {Math.floor(seconds / 60)}:
      {String(seconds % 60).padStart(2, "0")}
    </div>
  );
}
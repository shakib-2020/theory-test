import React from "react";

const Timer = () => {
  const startTimer = () => {
    const countDowntime = Date.now() + 10000;
    intervel = setInterval(() => {
      const now = new Date();
      const distance = countDowntime - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance <= 0) {
        clearInterval(intervel);
        setTime({
          minutes: 0,
          seconds: 0,
        });
        (() => {
          alert("quiz has ended!Start Again");
          navigate("/quizResult");
        })();
      } else {
        setTime({
          minutes,
          seconds,
        });
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();
  });
  return <div>Timer</div>;
};

export default Timer;

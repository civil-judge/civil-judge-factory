import React, { useCallback, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

export default function Realistic() {
  const refAnimationInstance = useRef(null);

  const [show, setShow] = React.useState(true);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        decay: 0.9,
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 360,
      startVelocity: 55,
    });
    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  useEffect(() => {
    fire();
  }, []);

  if (!show) return null;

  return (
    <div
      onClick={() => setShow(false)}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        transition: "all 0.5s ease",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          animation: "fadeInUp 1s ease",
        }}
      >
        <img
          src="/images/bronzeTrophy.png"
          alt="celebration"
          style={{
            width: "250px",
            filter:
              "drop-shadow(0 0 5px #000) drop-shadow(0 0 60px #fff) drop-shadow(0 0 80px #ff9000) drop-shadow(0 0 120px #FFFF00)",
          }}
        />
        <h1
          style={{
            color: "#fff",
            textAlign: "center",
            filter: "drop-shadow(1px 1px 0.5px #000)",
          }}
        >
          Hooray! Bronze Trophy Unlocked !
        </h1>
      </div>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </div>
  );
}

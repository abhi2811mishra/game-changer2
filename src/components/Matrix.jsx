import React, { useEffect, useRef, useState } from "react";
import { Pane } from "https://esm.sh/tweakpane@4.0.3";

const Matrix = () => {
  const canvasRef = useRef(null);
  const [fps, setFps] = useState(30);
  const [color, setColor] = useState("#0f0");
  const [charset, setCharset] = useState("01");
  const [size, setSize] = useState(25);
  const [p, setP] = useState([]);
  
  useEffect(() => {
    const gui = new Pane({ title: "1337 Matrix by pavi2410" });
    gui.addBinding({ fps }, "fps", { min: 1, max: 120, step: 1 }).on("change", ev => setFps(ev.value));
    gui.addBinding({ color }, "color").on("change", ev => setColor(ev.value));
    gui.addBinding({ charset }, "charset").on("change", ev => setCharset(ev.value));
    gui.addBinding({ size }, "size", { min: 1, max: 120, step: 1 }).on("change", ev => setSize(ev.value));
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setP(Array(Math.ceil(canvas.width / size)).fill(0));
    };

    window.addEventListener("resize", resize);
    resize();

    const random = (items) => items[Math.floor(Math.random() * items.length)];

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `${size}px monospace`;

      setP((p) => {
        const newP = p.slice();
        for (let i = 0; i < newP.length; i++) {
          let v = newP[i];
          ctx.fillText(random(charset), i * size, v);
          newP[i] = v >= canvas.height || v >= 10000 * Math.random() ? 0 : v + size;
        }
        return newP;
      });
    };

    const intervalId = setInterval(draw, 1000 / fps);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resize);
    };
  }, [fps, color, charset, size]);

  return <canvas ref={canvasRef} id="canvas" style={{ margin: 0, overflow: "hidden" }} />;
};

export default Matrix;

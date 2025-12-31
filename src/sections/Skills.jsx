import { FaJava, FaReact, FaBootstrap } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFastapi,
  SiPython,
  SiDocker,
  SiMongodb,
  SiAngular,
} from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";
import { FaHtml5 } from "react-icons/fa6";
import { motion, useMotionValue } from "framer-motion";
import { SiCplusplus } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

export default function Skills() {
  const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <SiCplusplus />, name: "C++" },
    { icon: <FaHtml5 />, name: "Html5" },
    { icon: <IoLogoJavascript />, name: "JavScript" },
    { icon: <FaBootstrap />, name: "Bootstrap" },
    { icon: <FaReact />, name: "React" },
    // { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <SiPython />, name: "Python" },
    // { icon: <SiDocker />, name: "Docker" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    // { icon: <SiAngular />, name: "Angular" },
  ];

  const repeated = [...skills, ...skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);

  const x = useMotionValue(0);

  /* ---------------- Intersection Observer ---------------- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---------------- Scroll + Touch Direction ---------------- */
  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => {
      setDir(e.deltaY > 0 ? -1 : 1);
    };

    const onTouchStart = (e) => {
      touchY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (touchY.current === null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  /* ---------------- Marquee Animation ---------------- */
  useEffect(() => {
    if (!active) return;

    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      let next = x.get() + SPEED * dir * dt;
      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }

      x.set(next);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, x, active]);

  /* ---------------- Mouse Move Direction ---------------- */
useEffect(() => {
  if (!active) return;

  const onMouseMove = (e) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const midX = rect.left + rect.width / 2;

    if (e.clientX < midX) {
      setDir(-1); // move left
    } else {
      setDir(1); // move right
    }
  };

  window.addEventListener("mousemove", onMouseMove);

  return () => {
    window.removeEventListener("mousemove", onMouseMove);
  };
}, [active]);


  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full pb-16 flex flex-col items-center justify-center bg-black text-white overflow-hidden"
    >
      {/* -------- GLOW BACKGROUND -------- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[320px] h-[320px]
          rounded-full bg-gradient-to-r from-[#302b63] via-[#00df8f] to-[#1cd8d2]
          opacity-30 blur-[140px] animate-pulse" />

        <div className="absolute bottom-1/4 right-1/2 w-[320px] h-[320px]
          rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00df8f] to-[#302b63]
          opacity-25 blur-[140px] animate-pulse delay-700" />
      </div>

      {/* -------- TITLE -------- */}
      <motion.h2
        className="text-4xl mt-6 sm:text-5xl font-bold bg-clip-text text-transparent
        bg-gradient-to-r from-[#1cd8d2] via-[#00df8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Skills
      </motion.h2>

      <motion.p
        className="mt-2 mb-10 text-white/80 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        Modern Application | Modern Technology
      </motion.p>

      {/* -------- MARQUEE -------- */}
      <div className="relative w-full overflow-hidden z-10">
        <motion.div
          ref={trackRef}
          // style={{ x, whiteSpace:'nowrap', willChange:"transform" }} in this upper fourth useeffect not write to use this
          style={{ x }}

          className="flex gap-10 text-6xl text-[#1cd8d2] whitespace-nowrap"
        >
          {repeated.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 min-w-[100px]"
            >
              <span className="hover:scale-110 transition-transform duration-300">
                {s.icon}
              </span>
              <p className="text-sm">{s.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

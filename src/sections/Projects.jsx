import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

// Desktop images
import img1 from "../assets/img1.JPG";
import img2 from "../assets/img2.JPG";
import img3 from "../assets/img3.JPG";

// Mobile images
import photo1 from "../assets/photo1.JPG";
import photo2 from "../assets/photo2.PNG";
import photo3 from "../assets/photo3.png";

/* ---------- Detect Mobile ---------- */
const useIsMobile = (query = "(max-width: 739px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);

  /* ---------- Project Data ---------- */
  const projects = useMemo(
    () => [
      {
        title: "NK Studio",
        link: "https://www.nk.studio/",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "Gamily",
        link: "https://gamilyapp.com/",
        bgColor: "#3884d3",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Hungry Tiger",
        link: "https://www.eathungrytiger.com/",
        bgColor: "#dc9317",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile]
  );

  /* ---------- Scroll Logic ---------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v < t);
    setActiveIndex(idx === -1 ? projects.length - 1 : idx);
  });

  /* ---------- Auto Change ---------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [projects.length]);

  const activeProject = projects[activeIndex];

  return (
    <section id="projects"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden text-white"
      style={{
        backgroundColor: activeProject.bgColor,
        transition: "background-color 500ms ease",
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center">

        {/* 🔹 MY WORK (TOP CENTER) */}
        <h2 className="mt-4 mb-8 text-4xl font-semibold tracking-wide">
          My Work
        </h2>

        {/* 🔹 CENTER CONTENT */}
        <div className="relative flex-1 w-full flex items-center justify-center">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute transition-all duration-500 mb-25 ${
                activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-10"
              }`}
              style={{ width: "70%", maxWidth: "1000px" }}
            >
              {/* PROJECT TITLE */}
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="text-left text-[clamp(2rem,6vw,4.5rem)]
                               italic font-semibold mb-1" //mb-6
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              {/* IMAGE */}
              <div className="relative w-full h-[60vh] md:h-[65vh]
                              rounded-xl overflow-hidden shadow-2xl">

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  // style={{
                  //   position:"relative",
                  //   zIndex:10,
                  //   filter: "drop-shadow(0,16px 40px rgba(0,0,0,0.65)",
                  //   transition:"filter 200ms ease",
                  // }}
                  loading="lazy"
                />

                {/* BUTTON */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 left-1/2 -translate-x-1/2
                             px-8 py-3 rounded-xl font-semibold
                             bg-white shadow-lg
                             transition-all duration-300 hover:scale-105"
                  style={{ color: project.bgColor }}
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

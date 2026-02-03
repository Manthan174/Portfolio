import ParticlesBackground from "../components/Particlesbackground";
import { motion } from "framer-motion";
import { useMemo, useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import avator from "../assets/avator2.png";

const socials = [
  { Icon: FaXTwitter, label: "X", href: "https://t.me/manthan_suhagiya/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/Manthan174/" },
  { Icon: FaLinkedin, label: "LinkedIn", href: "http://linkedin.com/in/manthan-suhagiya-003856349/" },
];

export default function Home() {
  const roles = useMemo(
    () => ["Full-Stack MERN Developer", "Web Developer"],
    []
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex(v => v + 1);
      else if (!deleting && subIndex === current.length)
        setTimeout(() => setDeleting(true), 1200);
      else if (deleting && subIndex > 0) setSubIndex(v => v - 1);
      else {
        setDeleting(false);
        setIndex(p => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden">
      <ParticlesBackground />

     
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[120px] animate-pulse delay-500" />
      </div>

      {/*  MOBILE */}
      <div className="relative z-10 flex justify-center mt-20  lg:hidden">
        <div
          className="absolute w-[260px] h-[260px] rounded-full blur-[45px] opacity-40"
          style={{
            background:
              "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302b63, #1cd8d2)",
          }}
        />
        <motion.img
          src={avator}
          alt="Manthan Suhagiya"
          className="relative z-10 w-[230px] object-contain"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
    
        <div className="flex flex-col justify-center text-center lg:text-left">
          <motion.div className="mb-3 text-xl sm:text-2xl md:text-3xl font-semibold text-white">
            {roles[index].substring(0, subIndex)}
            <span className="inline-block w-[2px] ml-1 bg-white animate-pulse" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">
            Hello, I'm <br />
            <span className="text-white">Manthan Suhagiya</span>
          </h1>

          <p className="mt-5 text-gray-300 max-w-2xl mx-auto lg:mx-0">
            I turn complex ideas into seamless, high-impact web experiences —
            building modern, scalable, and lightning-fast applications.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start gap-5">
            <a href="#projects" className="px-6 py-3 rounded-full text-white bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">
              View My Work
            </a>
   <a
  href={`${import.meta.env.BASE_URL}Manthan_Resume.pdf`}
  download
  className="px-6 py-3 rounded-full bg-white text-black"
>
  My Resume
</a>


          </div>

          <div className="mt-8 flex justify-center lg:justify-start gap-5 text-2xl">
            {socials.map(({ Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* DESKTOP */}
        <div className="relative hidden lg:block">
          <div
            className="absolute top-1/2 -translate-y-1/2 right-6 w-[380px] h-[380px] rounded-full blur-[40px] opacity-30"
            style={{
              background:
                "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302b63, #1cd8d2)",
            }}
          />
          <motion.img
            src={avator}
            alt="Manthan Suhagiya"
            className="absolute top-1/2 -translate-y-1/2 right-[-30px] w-[520px] h-[655px]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}

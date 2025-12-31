import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";


const socials = [
  { Icon: FaXTwitter, label: "X", href: "https://twitter.com/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/" },
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com/" },
];

const glowVariants = {
  initial: {
    scale: 1,
    y: 0,
    filter: "drop-shadow(0 0 0 rgba(0, 0, 0, 0))", // FIXED: fitler -> filter
  },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 8px rgba(16,185,129,0.98))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

export default function Footer() {

  return(
    <footer className="relative overflow-hidden bg-black" >
      <div className="pointer-events-none absolute inset-0
       bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,202,0.35),transparent_70%)]"/>
     
      <div className="pointer-events-none absolute inset-0
       bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)]"/>
     
     <motion.div className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center space-y-6"
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8 }}
     >
      <h2 className="font-semibold leading-none text-white texxt-center select-none tracking-tight"
      style={{
        fontSize: "clamp(3rem,5vw,14rem)",
        letterSpacing: "o.02em", 
        lineHeight: 0.9,
        padding: "0 3 vw",
        whiteSpace: "nowrap",
        textShadow: "0 2px 18px rgba(0,0,0,0.45)"
      }}
      >
         Manthan Suhagiya
      </h2>
      <div className="h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0d58cc] via-cyan-300 to-emerald-400"/>

      <div className="flex gap-5 text-2xl md:text-3xl">
        {socials.map(({Icon, label, href}) => (
          <motion.a href={href}
          key={label}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer "
          variants={glowVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="text-gray-300 transition-colors duration-200 inline-fles items-center justify-center"
          >

            <Icon/>
          </motion.a>
        ))}

      </div>

      <p className="text-gray-300 italic max-w-xl">
         "Success is when preparation meets opportunity."                     
      </p>

      <p className="text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Manthan Suhagiya. All rights reserved
      </p>
     </motion.div>
    </footer>
  )
}
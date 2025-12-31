import { useState, useEffect, useRef } from "react";
import OverlayMenu from "./OverlayMenu";
import Logo from "../assets/Logo.png";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);

  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  // Observe home section
  useEffect(() => {
    const homeSection = document.querySelector("#home");

    if (!homeSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(homeSection);

    return () => observer.disconnect();
  }, []);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (forceVisible) {
        setVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // scrolling down
        setVisible(false);
      } else {
        // scrolling up
        setVisible(true);

        if (timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
          setVisible(false);
        }, 3000);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [forceVisible]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-8 h-8" />
          <div className="text-2xl font-bold text-white">Manthan</div>
        </div>

        {/* Menu Button */}
        <div className="block lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white text-3xl"
            aria-label="Open Menu"
          >
            <FiMenu />
          </button>
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90"
          >
            Reach Out
          </a>
        </div>
      </nav>

      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}



//First Program

// import { useState } from "react";
// import OverLayMenu from "./OverLayMenu";
// import Logo from '../assets/Logo.png'
// import { FiMenu } from "react-icons/fi";
// import { PiButterflyDuotone } from "react-icons/pi";


// export default function Navbar(){

//     const [menuopen, setMenuOpen] = useState(false);
//     const [visible, setVisible] = useState(true);

//     return(
//         <>
//         <nav className={`fixed top-0 left-0 w-full flex item-center justify-between px-6 py-4 z-50 transitiom-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>

//             <div className="flex item-center space-x-2">
//                 <img src = {Logo} alt="Logo" className="w-8 h-8" />
//                 <div className="text-2xl font-bold text-white sm:block">Manthan</div>
//             </div>

//             <div className="block lg:absolute lg:left-1/2 lg:transform lg:-transform-x1/2">
//             <button onClick={() => setMenuOpen(true)}
//                     className="text-white text-3xl focus:outline-none" aria-label="Open Menu"
//             >   
//                 <FiMenu />
//             </button>
//             </div>

//             <div className="hidden lg:block">
//                 <a href="#contact"
//                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
//                 >
//                     Reach Out   
//                 </a>

//             </div>
//         </nav>
//         <OverLayMenu isOpen = {menuOpen} onClose = {() => setmenuOpen(false)}/>
//         </>
//     )
// }
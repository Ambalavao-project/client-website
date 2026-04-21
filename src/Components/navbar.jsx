import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  // On surveille "banque" au lieu de "establishment"
  const sections = ["home", "actuality", "banque", "comment"];

  useEffect(() => {
    if (location.pathname !== "/") return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Si on est sur la section "banque", on active la couleur
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setOpenMenu(null);
  };

  const getLinkStyle = (id) => {
    const isActive = activeSection === id && location.pathname === "/";
    return `px-3 py-2 transition-all duration-300 border-b-2 ${isActive
        ? "text-pink-600 border-pink-600 font-semibold"
        : "text-gray-700 border-transparent hover:text-pink-600"
      }`;
  };

  // Variable pour savoir si "Établissement" doit être rose
  // Il est rose si la section active est "banque" OU si on est sur une page spécifique
  const isEtabActive = activeSection === "banque" || location.pathname === "/all_banques";
  const isActualityActive = activeSection === "actuality" || location.pathname === "/all_actuality"

  return (
    <div className="w-full flex justify-center z-50 fixed top-4 bg-transparent">
      <nav className="flex w-4/5 max-w-6xl items-center justify-between bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-3 w-11/12 max-w-6xl">

        <div className="flex items-center text-pink-600 font-bold text-xl sm:text-2xl">
          Ambalavao
        </div>

        <button onClick={toggleMobileMenu} className="md:hidden text-pink-600 text-2xl focus:outline-none">
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* --- DESKTOP --- */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/#home" className={getLinkStyle("home")}>Accueil</NavLink>
          <NavLink
            to="/#actuality"
            className={`px-3 py-2 transition-all duration-300 border-b-2 ${isActualityActive ? "text-pink-600 border-pink-600 font-semibold" : "text-gray-700 border-transparent hover:text-pink-600"
              }`}
          >
            Actualité
          </NavLink>

          <div className="relative">
            <button
              onClick={() => toggleMenu("etablissement")}
              className={`px-3 py-2 flex items-center gap-1 transition-all border-b-2 ${isEtabActive
                  ? "text-pink-600 border-pink-600 font-semibold"
                  : "text-gray-700 border-transparent hover:text-pink-600"
                }`}
            >
              Établissement <FaChevronDown size={10} className={openMenu === "etablissement" ? "rotate-180" : ""} />
            </button>

            {openMenu === "etablissement" && (
              <div className="absolute mt-2 bg-white border rounded-lg shadow-lg z-50 w-52 py-2 animate-modal-content">
                <NavLink to="/#banque" className="block px-4 py-2 hover:bg-pink-50 hover:text-pink-600" onClick={() => setOpenMenu(null)}>
                  Banques
                </NavLink>
                <NavLink to="/#etablissement" className="block px-4 py-2 hover:bg-pink-50 hover:text-pink-600" onClick={() => setOpenMenu(null)}>
                  Entreprises
                </NavLink>
                <NavLink to="/#hotel" className="block px-4 py-2 hover:bg-pink-50 hover:text-pink-600" onClick={() => setOpenMenu(null)}>
                  Hotel
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/#comment" className={getLinkStyle("comment")}>Commentaire</NavLink>
        </div>

        {/* --- MOBILE --- */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl md:hidden flex flex-col p-4">
            <NavLink to="/#home" className="py-3 px-6" onClick={toggleMobileMenu}>Accueil</NavLink>
            <NavLink
              to="/#actuality"
              className={`py-3 px-6 ${isActualityActive ? "text-pink-600 font-bold" : "hover:text-pink-600"}`}
              onClick={toggleMobileMenu}
            >
              Actualité
            </NavLink>

            <div className="flex flex-col">
              <button
                onClick={() => toggleMenu("etab_mobile")}
                className={`py-3 px-6 flex justify-between items-center ${isEtabActive ? "text-pink-600 font-bold" : "text-gray-700"}`}
              >
                Établissement <FaChevronDown size={12} className={openMenu === "etab_mobile" ? "rotate-180" : ""} />
              </button>

              {openMenu === "etab_mobile" && (
                <div className="bg-gray-50 rounded-lg ml-6 flex flex-col">
                  <NavLink to="/#banque" className="py-2 px-6 text-sm hover:text-pink-600" onClick={toggleMobileMenu}>
                    Banques
                  </NavLink>
                  <NavLink to="/#etablissement" className="py-2 px-6 text-sm hover:text-pink-600" onClick={toggleMobileMenu}>
                    Entreprises
                  </NavLink>
                  <NavLink to="/#hotel" className="py-2 px-6 text-sm hover:text-pink-600" onClick={toggleMobileMenu}>
                    Hotel
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink to="/#comment" className="py-3 px-6" onClick={toggleMobileMenu}>Commentaire</NavLink>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
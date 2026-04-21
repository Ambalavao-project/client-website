import React, { useEffect, useState } from "react";
import { FaCalendar, FaGlobe, FaLink } from "react-icons/fa";
import ModalActuality from "./modalActuality";
import { NavLink } from "react-router-dom";
import UseFetchData from "../../hooks/useFetchData";

const Actuality = () => {
  const {data} = UseFetchData("list_actualities", 1, 3)
  const [modal, setModal] = useState(false);
  const [selectedActuality, setSelectedActuality] = useState(null);

  // IntersectionObserver pour animation cascade
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.index * 150;
            entry.target.style.animationDelay = `${delay}ms`;
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    // On observe tous les éléments avec class anim-item
    document.querySelectorAll(".anim-item").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [data]); // 🔥 On relance l'observer à chaque mise à jour des actualities

  return (
    <div className="pt-24 pb-12 px-6">
      {/* TITRE */}
      <div className="flex items-center justify-center opacity-0 anim-item" data-index={0}>
        <div className="w-16 h-[2px] bg-pink-600 mr-4"></div>
        <h2 className="text font-bold text sm:text-2xl md:text-2xl text-center text-gray-800 uppercase tracking-wide">
          Actualité & Annonce
        </h2>
        <div className="w-16 h-[2px] bg-pink-600 ml-4"></div>
      </div>

      {/* SOUS-TITRE */}
      <div className="text-center mt-10 opacity-0 anim-item" data-index={1}>
        <h1 className="font-bold text-3xl sm:text-5xl ">
          Suivez <span className="text-pink-600">l'Actu</span>
        </h1>
        <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
          Suivez régulièrement nos actualités afin de ne rien manquer de nos
          nouvelles initiatives et de nos moments forts.
        </p>
      </div>

      {/* CARTES */}
      <div className="mt-12 flex flex-wrap justify-center gap-8">
        {data.map((actuality, index) => (
          <div
            key={actuality.news_id}
            data-index={index + 3}
            className="anim-item bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex flex-col opacity-0"
          >
            <img
              src={`http://localhost:8000${actuality.image_news.image}`}
              alt={actuality.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 text-xs sm:text-sm flex flex-col flex-1">
              <h3 className="font-bold text-lg text-center mb-3 text-gray-900">
                {actuality.title}
              </h3>
              <p className="flex items-center gap-2 text-gray-700 mb-2">
                <FaCalendar className="text-blue-700" />
                Date de publication: {actuality.date}
              </p>
              <p className="flex items-center gap-2 text-gray-700 mb-2">
                <FaLink className="text-blue-700" /> Source : {actuality.source}
              </p>
              <div className="mt-auto flex justify-center">
                <button
                  onClick={() => {
                    setSelectedActuality(actuality.news_id);
                    setModal(true);
                  }}
                  className="bg-pink-600 px-4 py-2 text-white rounded-full hover:bg-pink-800 transition-all"
                >
                  En Savoir plus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOUTON BAS DE PAGE */}
      <div className="flex justify-center mt-20 opacity-0 anim-item" data-index={data.length + 3}>
        <NavLink
          to={"/all_actuality"}
          className="bg-pink-600 text-sm sm:text-base flex items-center gap-2 text-white px-4 py-3 sm:px-5 sm:py-3 shadow rounded-full hover:bg-pink-700 hover:shadow-lg transition-all"
        >
          <FaGlobe size={20} /> Voir toute l'actualité ou annonce
        </NavLink>
      </div>

      {/* MODAL */}
      <ModalActuality
        isOpen={modal}
        onClose={() => setModal(false)}
        actuality={selectedActuality}
      />
    </div>
  );
};

export default Actuality;

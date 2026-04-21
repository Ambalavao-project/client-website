import React, { useEffect, useState } from "react";
import ModalActuality from "./modalActuality";
import { FiChevronsLeft, FiChevronsRight, FiSearch } from "react-icons/fi";
import { FaCalendar, FaLink } from "react-icons/fa";
import SearchBar from "../../Components/searchBar";
import UseFetchAllData from "../../hooks/useFetchAllData";

const AllActuality = () => {
  const {data, page, setPage, searchTerm, setSearchTerm, totalPages} = UseFetchAllData("list_actualities", "search_actualities", 6)
  const [modal, setModal] = useState(false);
  const [selectedActuality, setSelectedActuality] = useState(null);
  

  // IntersectionObserver pour animation cascade
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.index * 100;
            entry.target.style.animationDelay = `${delay}ms`;
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".anim-item").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [data]);

  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-12 px-6 mt-4 sm:mt-20">
        {/* TITRE PRINCIPAL */}
        <div className="flex items-center justify-center opacity-0 anim-item" data-index={0}>
          <div className="w-16 h-[2px] bg-pink-600 mr-4"></div>
          <h2 className="text-sm sm:text-xl text-center font-bold text-gray-800 uppercase tracking-wide">
            Actualité & Annonce
          </h2>
          <div className="w-16 h-[2px] bg-pink-600 ml-4"></div>
        </div>

        {/* SOUS-TITRE */}
        <div className="text-center mt-10 opacity-0 anim-item" data-index={1}>
          <h1 className="font-bold text-3xl sm:text-5xl">
            Voir toute <span className="text-pink-600">l'Actu</span>
          </h1>
          <p className="mt-3 text-sm sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Suivez régulièrement nos actualités afin de ne rien manquer de nos
            nouvelles initiatives et de nos moments forts.
          </p>
        </div>

        <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Rechercher des actualités ..."
        />

        {/* LISTE DES CARTES */}
        <div className="mt-5  flex flex-wrap justify-center gap-8">
          {data.map((actuality, index) => (
            <div
              key={actuality.news_id}
              data-index={index + 2} // continue la cascade après les titres
              className="anim-item bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex flex-col opacity-0"
            >
              {/* IMAGE */}
              <img
                src={`http://localhost:8000${actuality.image_news.image}`}
                alt={actuality.title}
                className="h-48 w-full object-cover"
              />

              {/* CONTENU */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text sm:text-lg text-center mb-3 text-gray-900">
                  {actuality.title}
                </h3>
                <p className="flex text-xs sm:text-sm items-center gap-2 text-gray-700 mb-2">
                  <FaCalendar className="text-blue-700" />
                  Date de publication: {actuality.date}
                </p>
                <p className="flex text-xs sm:text-sm items-center gap-2 text-gray-700 mb-2">
                  <FaLink className="text-blue-700" /> Source : {actuality.source}
                </p>

                <div className="mt-auto text-xs sm:text-sm flex justify-center">
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

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 mt-8 opacity-0 anim-item" data-index={data.length + 2}>
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 border bg-white rounded-lg hover:bg-pink-600 hover:text-white disabled:opacity-50 transition-all duration-200"
          >
            <FiChevronsLeft />
          </button>
          <span className="px-4 py-2">
            Page {page} sur {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border bg-white rounded-lg hover:bg-pink-600 hover:text-white disabled:opacity-50 transition-all duration-200"
          >
            <FiChevronsRight />
          </button>
        </div>

        <ModalActuality
          isOpen={modal}
          onClose={() => setModal(false)}
          actuality={selectedActuality}
        />
      </div>
    </div>
  );
};

export default AllActuality;

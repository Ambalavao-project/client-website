import React, { useEffect } from "react";
import Navbar from "../../Components/navbar";
import { FaNewspaper, FaBuilding, FaComments } from "react-icons/fa";
import { GiFarmTractor } from "react-icons/gi";

// Cartes
const cards = [
  {
    icon: <FaNewspaper size={50} className="text-pink-600 mx-auto mb-4" />,
    title: "Actualité",
    text: "Découvrez les dernières actualités et informations importantes de notre ville.",
  },
  {
    icon: <FaBuilding size={50} className="text-pink-600 mx-auto mb-4" />,
    title: "Établissements",
    text: "Accédez aux informations sur les établissements publics et privés, école, etc.",
  },
  {
    icon: <GiFarmTractor size={50} className="text-pink-600 mx-auto mb-4" />,
    title: "Autres",
    text: "Site Touristique, Résultats d’examen et autres informations utiles.",
  },
  {
    icon: <FaComments size={50} className="text-pink-600 mx-auto mb-4" />,
    title: "Commentaire",
    text: "Laissez vos commentaires et suggestions pour améliorer notre site.",
  },
];

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.index * 200; // cascade
            entry.target.style.animationDelay = `${delay}ms`;
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".card").forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Image plein écran */}
      <div className="relative w-full h-screen">
        <img
          src="/istockphoto-957786982-612x612.jpg"
          alt="Ville"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center px-4">
          {/* Titres */}
          <h1 className="text-white text sm:text-4xl md:text-6xl font-bold tracking-wide drop-shadow-lg opacity-0 card" data-index={0}>
            Bienvenue dans le site web d’
          </h1>
          <h2 className="text-pink-500 text-4xl sm:text-5xl md:text-7xl font-extrabold mt-2 drop-shadow-lg opacity-0 card" data-index={1}>
            Ambalavao
          </h2>
          <p className="text-gray-200 mt-6 text-lg md:text-xl max-w-2xl opacity-0 card" data-index={2}>
            La perle du Sud de Madagascar, entre montagnes et traditions.
          </p>
        </div>
      </div>

      {/* Section texte */}
      <div className="p-8 text-center mt-11 opacity-0 card" data-index={3}>
        <p className="text-gray-700 text-lg">
          Voici un aperçu complet des différentes rubriques accessibles sur
          notre site.
        </p>
      </div>

      {/* Grille des cartes */}
      <div className="mt-8 grid gap-6 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-4/5 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card bg-white rounded-lg shadow-md overflow-hidden text-center p-6 
                       transform transition duration-500 ease-in-out 
                       hover:-translate-y-2 hover:scale-105 hover:shadow-xl opacity-0"
            data-index={index + 4} // continue la cascade après les titres
          >
            {card.icon}
            <h3 className="font-bold text-lg mb-2">{card.title}</h3>
            <p className="text-gray-700 text-sm md:text-base">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

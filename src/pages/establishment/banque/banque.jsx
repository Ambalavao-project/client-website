import React, { useEffect, useState } from "react";
import { FaLandmark, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import ModalBanque from "./modalBanque";
import { NavLink } from "react-router-dom";
import Establishment from "../establishment";
import UseFetchData from "../../../hooks/useFetchData";
import { getFullImageUrl } from "../../../utils/imageHelper";

const Banque = () => {
    // Note: data doit contenir assez d'éléments pour le scroll (ou être doublé)
    const { data } = UseFetchData("get_all_bank", 1, 6)
    const [modal, setModal] = useState(false)
    const [selectedBanque, setSelectedBanque] = useState(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.dataset.index * 150;
                        entry.target.style.animationDelay = `${delay}ms`
                        entry.target.classList.add('animate-fade-in-up');
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

        document.querySelectorAll(".anim-item").forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [data])

    if (!data) return null;

    return (
        <div className="pt-4 pb-12 bg-gray-50/50 overflow-hidden">
            <Establishment />
            
            {/* Titre avec animation d'apparition */}
            <div className="text-center mt-10 opacity-0 anim-item" data-index={1}>
                <h1 className="font-bold text-3xl sm:text-5xl">
                    Ban<span className="text-pink-600">que</span>
                </h1>
                <p className="mt-3 text-gray-700 max-w-2xl mx-auto italic px-6">
                    Consultez la liste des établissements bancaires du district.
                </p>
            </div>

            {/* Zone de défilement avec apparition globale */}
            <div className="mt-12 w-4/5 max-w-6xl mx-auto opacity-0 anim-item" data-index={2}>
                <div className="relative flex overflow-hidden">
                    {/* Le ruban qui défile */}
                    <div className="animate-scroll-infinite flex gap-6 py-4">
                        {/* On double la liste pour l'effet infini */}
                        {[...data, ...data].map((banque, index) => (
                            <div key={`${banque.bank_id}-${index}`} className="w-[280px] shrink-0">
                                {/* LA CARTE : Animation de levée au survol */}
                                <div className="bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col overflow-hidden transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
                                    <img
                                        src={getFullImageUrl(banque.entity.image.image)}
                                        alt={banque.name}
                                        className="h-44 w-full object-cover"
                                    />

                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="font-bold text-xl text-gray-900 mb-4 border-b pb-2 border-gray-50">
                                            {banque.name}
                                        </h3>

                                        <div className="flex items-center gap-2 text-gray-600 mb-5">
                                            <FaUser className="text-pink-600 shrink-0" size={14} />
                                            <span className="text-sm font-medium">
                                                {banque.entity.owner.first_name} {banque.entity.owner.last_name}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-0 border-t border-gray-100 pt-4 mb-6">
                                            <div className="flex flex-col gap-1 pr-2 border-r border-gray-100">
                                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
                                                    <FaMapMarkerAlt className="text-blue-600" /> Adresse
                                                </span>
                                                <p className="text-[11px] text-gray-700 leading-tight line-clamp-2">
                                                    {banque.entity.town}
                                                </p>
                                            </div>

                                            <div className="flex flex-col gap-1 pl-3">
                                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
                                                    <FaPhone className="text-blue-600" /> Contact
                                                </span>
                                                <p className="text-[11px] text-gray-700 font-semibold">
                                                    {banque.entity.contact}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <button
                                                className="w-full bg-white text-pink-600 border border-pink-600 py-2.5 rounded-xl hover:bg-pink-600 hover:text-white transition-all duration-300 text-sm font-bold shadow-sm"
                                                onClick={() => {
                                                    setSelectedBanque(banque.bank_id)
                                                    setModal(true)
                                                }}
                                            >
                                                En savoir plus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bouton de fin avec apparition */}
            <div className="flex justify-center mt-20 opacity-0 anim-item" data-index={3}>
                <NavLink to={'/all_banques'} className="bg-pink-600 text-white px-6 py-3 rounded-full shadow hover:bg-pink-700 transition-all flex items-center gap-2 transform hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
                    <FaLandmark size={20} /> Voir toutes les banques
                </NavLink>
            </div>

            <ModalBanque
                isOpen={modal}
                onClose={() => setModal(false)}
                banque={selectedBanque}
            />
        </div>
    )
}

export default Banque
import React, { useEffect, useState } from "react";
import { FaBed, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import ModalHotel from "./modalHotel";
import UseFetchData from "../../../hooks/useFetchData";
import { getFullImageUrl } from "../../../utils/imageHelper";
import { NavLink } from "react-router-dom";
import useDragScroll from "../../../hooks/useDragScroll";

const Hotel = () => {
    const { data } = UseFetchData("get_all_hotel", 1, 6)
    const [modal, setModal] = useState(false)
    const [selectedHotel, setSelectedHotel] = useState(null)
    const { scrollRef, dragEvents } = useDragScroll(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.dataset.index * 150
                        entry.target.style.animationDelay = `${delay}ms`
                        entry.target.classList.add('animate-fade-in-up')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.2 }
        )
        document.querySelectorAll(".anim-item").forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [data])

    return (
        <div className="pt-4 pb-12 px-6 bg-gray-50/50 overflow-hidden">
            <div className="text-center mt-10 opacity-0 anim-item" data-index={1}>
                <h1 className="font-bold text-3xl sm:text-5xl">
                    Ho<span className="text-pink-600">tel</span>
                </h1>
                <p className="mt-3 text-gray-700 max-w-2xl mx-auto italic">
                    Trouvez l'hébergement idéal pour votre séjour à Ambalavao : une sélection d'hôtels et de gîtes de charme pour vous garantir un repos bien mérité après vos aventures.
                </p>
            </div>

            <div className="mt-12 w-4/5 max-w-6xl mx-auto opacity-0 anim-item" data-index={2}>
                <div 
                    ref={scrollRef}
                    {...dragEvents}
                    className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none touch-pan-x mask-edges"
                >
                    <div className="animate-scroll-infinite flex gap-6 py-4">
                        {[...data, ...data, ...data].map((hotel, index) => (
                            <div key={`${hotel.hotel_id}-${index}`} className="w-[280px] shrink-0">
                                <div className="bg-white  border border-gray-100 shadow-sm flex flex-col overflow-hidden transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
                                    <img
                                        src={getFullImageUrl(hotel.entity.image.image)}
                                        alt={hotel.name}
                                        className="h-44 w-full object-cover "
                                    />

                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="font-bold text-xl text-gray-900 mb-4 border-b pb-2 border-gray-50">
                                            {hotel.name}
                                        </h3>

                                        <div className="flex items-center gap-2 text-gray-600 mb-5">
                                            <FaUser className="text-pink-600 shrink-0" size={14} />
                                            <span className="text-sm font-medium">
                                                {hotel.entity.owner.first_name} {hotel.entity.owner.last_name}
                                            </span>
                                        </div>

                                        {/* Section Adresse et Contact Alignés sur une grille */}
                                        <div className="grid grid-cols-2 gap-0 border-t border-gray-100 pt-4 mb-6">
                                            {/* Colonne Gauche : Localisation */}
                                            <div className="flex flex-col gap-1 pr-2 border-r border-gray-100">
                                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    <FaMapMarkerAlt className="text-blue-600" /> Adresse
                                                </span>
                                                <p className="text-[11px] text-gray-700 leading-tight line-clamp-2">
                                                    {hotel.entity.localisation} <br />
                                                    {hotel.entity.town}
                                                </p>
                                            </div>

                                            {/* Colonne Droite : Contact */}
                                            <div className="flex flex-col gap-1 pl-3">
                                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    <FaPhone className="text-blue-600" /> Contact
                                                </span>
                                                <p className="text-[11px] text-gray-700 font-semibold">
                                                    {hotel.entity.contact}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-auto">
                                            <button
                                                onClick={() => {
                                                    setSelectedHotel(hotel.hotel_id)
                                                    setModal(true)
                                                }}
                                                className="w-full bg-white text-pink-600 border border-pink-600 py-2.5 rounded-xl hover:bg-pink-600 hover:text-white transition-all duration-300 text-sm font-bold shadow-sm"
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

            <div className="flex justify-center mt-20 opacity-0 anim-item" data-index={3}>
                <NavLink to={'/all_hotel'} className="bg-pink-600 text-white px-6 py-3 rounded-full shadow hover:bg-pink-700 transition-all flex items-center gap-2 transform hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
                    <FaBed size={20} /> Voir Plus d'hôtel
                </NavLink>
            </div>

            <ModalHotel
                isOpen={modal}
                onClose={() => setModal(false)}
                hotel={selectedHotel}
            />
        </div>
    )
}

export default Hotel
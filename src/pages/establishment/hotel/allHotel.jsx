import React, { useEffect, useState } from "react";
import UseFetchAllData from "../../../hooks/useFetchAllData";
import Establishment from "../establishment";
import SearchBar from "../../../Components/searchBar";
import { getFullImageUrl } from "../../../utils/imageHelper";
import { FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import ModalHotel from "./modalHotel";

const AllHotel = () => {
    const { data, page, setPage, searchTerm, setSearchTerm, totalPages } = UseFetchAllData("get_all_hotel", "search_hotel", 6)
    const [modal, setModal] = useState(false)
    const [selectedHotel, setSelectedHotel] = useState(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.dataset.index * 100
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
        <div className="min-h-screen">
            <Establishment />
            <div className="px-6">
                <div className="flex items-center justify-center opacity-0 anim-item" data-index={0}>
                    <h2 className="text-3xl sm:text-5xl text-center font-bold text-gray-800 uppercase tracking-wide">
                        Ho<span className="text-pink-600">tel</span>
                    </h2>
                </div>

                <div className="text-center mt-10 opacity-0 anim-item" data-index={1}>
                    <p className="mt-3 text-sm text-gray-700 max-w-2xl mx-auto">
                        Trouvez l'hébergement idéal pour votre séjour à Ambalavao : une sélection d'hôtels et de gîtes de charme pour vous garantir un repos bien mérité après vos aventures.
                    </p>
                </div>

                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder={"Recherche hôtel ..."}
                />

                <div className="mt-12 flex flex-wrap justify-center gap-8">
                    {data.map((hotel, index) => (
                        <div
                            key={hotel.hotel_id}
                            data-index={index + 3}
                            className="anim-item bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 w-80 flex flex-col opacity-0 overflow-hidden"
                        >
                            <img
                                src={getFullImageUrl(hotel.entity.image.image)}
                                alt={hotel.name}
                                className="h-44 w-full object-cover"
                            />

                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="font-bold text-xl text-gray-900 mb-4 border-b pb-12 border-gray-50">
                                    {hotel.name}
                                </h3>

                                <div className="flex items-center gap-2 text-gray-600 mb-5">
                                    <FaUser className="text-pink-600 shrink-0" size={14} />
                                    <span className="text-sm font-medium">
                                        {hotel.entity.owner.first_name} {hotel.entity.owner.last_name}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-0 border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex flex-col gap-1 pr-2 border-r border-gray-100">
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 tracking-wider">
                                            <FaMapMarkerAlt className="text-blue-600" /> Adresse
                                        </span>
                                        <p className="text-[11px] text-gray-700 leading-tight line-champ-2">
                                            {hotel.entity.localisation} <br />
                                            {hotel.entity.town}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-1 pl-3">
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 tracking-wider">
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
                    ))}
                </div>
            </div>
            <ModalHotel
                isOpen={modal}
                onClose={() => setModal(false)}
                hotel={selectedHotel}
            />
        </div>
    )
}

export default AllHotel
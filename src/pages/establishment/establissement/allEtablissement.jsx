import React, { useEffect, useState } from "react";
import UseFetchAllData from "../../../hooks/useFetchAllData";
import Establishment from "../establishment";
import SearchBar from "../../../Components/searchBar";
import { FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import ModalEtablissement from "./modalEtablissement";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const AllEtablissement = () => {
    const { data, page, setPage, searchTerm, setSearchTerm, totalPages } = UseFetchAllData("get_all_establishment", "search_establishment", 6)
    const [modal, setModal] = useState(false)
    const [selectedEstablishment, setSelectedEstablishment] = useState(null)

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
                        Entre<span className="text-pink-600">prise</span>
                    </h2>
                </div>
                <div className="text-center mt-10 opacity-0 anim-item" data-index={1}>
                    <p className="mt-3 text-sm text-gray-700 max-w-2xl mx-auto">
                        Consultez la liste des établissements  du district afin de trouver des entreprises  nécessaire à vos projets.
                    </p>
                </div>

                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Recherche des entreprises..."
                />

                <div className="mt-12 flex flex-wrap justify-center gap-8">
                    {data.map((etablissement, index) => (
                        <div
                            key={etablissement.establishment_id}
                            data-index={index + 3}
                            className="anim-item bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 w-80 flex flex-col opacity-0 overflow-hidden"
                        >
                            <img
                                src={`http://localhost:8000${etablissement.entity.image.image}`}
                                alt={etablissement.name}
                                className="h-44 w-full object-cover"
                            />

                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="font-bold text-xl text-gray-900 mb-4 border-b pb-12 border-gray-50">
                                    {etablissement.name}
                                </h3>

                                <div className="flex items-center gap-2 text-gray-600 mb-5">
                                    <FaUser className="text-pink-600 shrink-0" size={14} />
                                    <span className="text-sm font-medium">
                                        {etablissement.entity.owner.first_name} {etablissement.entity.owner.last_name}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-0 border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex flex-col gap-1 pr-2 border-r border-gray-100">
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 tracking-wider">
                                            <FaMapMarkerAlt className="text-blue-600" /> Adresse
                                        </span>
                                        <p className="text-[11px] text-gray-700 leading-tight line-champ-2">
                                            {etablissement.entity.localisation} <br />
                                            {etablissement.entity.town}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-1 pl-3">
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 tracking-wider">
                                            <FaPhone className="text-blue-600" /> Contact
                                        </span>
                                        <p className="text-[11px] text-gray-700 font-semibold">
                                            {etablissement.entity.contact}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <button
                                        onClick={() => {
                                            setSelectedEstablishment(etablissement.establishment_id)
                                            setModal(true)
                                        }}
                                        className="w-full bg-white text-pink-600 border border-pink-600 py-2.5 rounded-xl hover:bg-pink-600 hover:text-white transition-all duration-300 text-sm font-bold shadow-sm"
                                    >
                                        En Savoir Plus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
            </div>
            <ModalEtablissement
                isOpen={modal}
                onClose={() => setModal(false)}
                etablissement={selectedEstablishment}
            />
        </div>
    )
}

export default AllEtablissement
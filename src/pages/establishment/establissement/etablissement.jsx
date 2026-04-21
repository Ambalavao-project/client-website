import { useEffect, useState } from "react"
import UseFetchData from "../../../hooks/useFetchData"
import { FaBuilding, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa"
import ModalEtablissement from "./modalEtablissement"
import { NavLink } from "react-router-dom"

const Etablissement = () => {
    const { data } = UseFetchData("get_all_establishment", 1, 6)
    const [modal, setModal] = useState(false)
    const [selectedEtablissement, setSelectedEtablissement] = useState(null)

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
                    Entre<span className="text-pink-600">prise</span>
                </h1>
                <p className="mt-3 text-gray-700 max-w-2xl mx-auto italic">
                    Consultez la liste des établissements  du district afin de trouver des entreprises  nécessaire à vos projets.
                </p>
            </div>

            <div className="mt-12 w-4/5 max-w-6xl mx-auto opacity-0 anim-item" data-index={2}>
                <div className="relative flex overflow-hidden">
                    <div className="animate-scroll-rigth flex gap-6 py-4">
                        {[...data, ...data].map((establishment, index) => (
                            <div key={`${establishment.establishment_id}-${index}`} className="w-[280px] shrink-0">
                                <div className="bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col overflow-hidden transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
                                    <img
                                        src={`http://localhost:8000${establishment.entity.image.image}`}
                                        alt={establishment.name}
                                        className="h-44 w-full object-cover"
                                    />

                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="font-bold text-xl text-gray-900 mb-4 border-b pb-2 border-gray-50">
                                            {establishment.name}
                                        </h3>

                                        <div className="flex items-center gap-2 text-gray-600 mb-5">
                                            <FaUser className="text-pink-600 shrink-0" size={14} />
                                            <span className="text-sm font-medium">
                                                {establishment.entity.owner.first_name} {establishment.entity.owner.last_name}
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
                                                    {establishment.entity.localisation} <br />
                                                    {establishment.entity.town}
                                                </p>
                                            </div>

                                            {/* Colonne Droite : Contact */}
                                            <div className="flex flex-col gap-1 pl-3">
                                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    <FaPhone className="text-blue-600" /> Contact
                                                </span>
                                                <p className="text-[11px] text-gray-700 font-semibold">
                                                    {establishment.entity.contact}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-auto">
                                            <button
                                                onClick={() => {
                                                    setSelectedEtablissement(establishment.establishment_id)
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
            <div className="flex justify-center mt-20 opacity-0 anim-item" data-index={data.length + 3}>
                <NavLink to={'/all_etablissement'} className="bg-pink-600 text-sm sm:text-base flex items-center gap-2 text-white px-4 py-3 rounded-full sm:px-5 sm:py-3 shadow hover:bg-pink-700 hover:shadow-lg transition-all transform hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
                    <FaBuilding size={20} /> Voir toute les entreprises
                </NavLink>
            </div>
            <ModalEtablissement
                isOpen={modal}
                onClose={() => setModal(false)}
                etablissement={selectedEtablissement}
            />
        </div>
    )
}

export default Etablissement
import { FaBed, FaCalendar, FaClock, FaConciergeBell, FaLandmark, FaMapMarkerAlt, FaPhone, FaStar, FaUser } from "react-icons/fa"
import UseFetchDataById from "../../../hooks/useFetchDataById"
import { getFullImageUrl } from "../../../utils/imageHelper"

const ModalHotel = ({ isOpen, onClose, hotel }) => {
    if (!isOpen) return null

    const { data, isLoading } = UseFetchDataById("get_hotel_by_id", hotel, isOpen)

    if (!data && isLoading) {
        return (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white p-10 rounded-3xl animate-pulse text-pink-600 font-bold">
                    Chargement...
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modal-overplay">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-6 md:p-10 relative overflow-y-auto max-h-[90vh] animate-modal-content">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-6 text-3xl text-gray-400 hover:text-pink-600 transition-colors z-10"
                    aria-label="Fermer"
                >
                    &times;
                </button>

                <h2 className="text-2xl sm:text:4xl font-extrabold text-gray-950 text-center mb-8 pb-4 border-b border-gray-100 flex items-center justify-center gap-3">
                    <FaBed className="text-pink-600" size={30} />
                    {data?.name || "Détails de l'hôtel"}
                </h2>

                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="flex-none w-full md:w-1/3 flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Responsable</span>
                        {data?.entity.owner.image_owner.image ? (
                            <img src={getFullImageUrl(data.entity.owner.image_owner.image)}
                                alt=""
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md border-4 border-white ring-1 ring-gray-200 mb-4"
                            />
                        ) : (
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                <FaUser size={50} className="text-pink-600" />
                            </div>
                        )}

                        <div className="flex flex-col items-start gap-4 mt-6 w-full px-2 border-t border-gray-100 pt-6">
                            {/* BLOC : NOM DU RESPONSABLE */}
                            <div className="flex items-center gap-3 group w-full text-left">
                                {/* Correction : ajout de items-center et justify-center pour centrer l'icône dans le carré */}
                                <div className="flex-shrink-0 w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                                    <FaUser className="text-pink-600" size={14} />
                                </div>

                                {/* Correction : ajout de items-start pour forcer l'alignement à gauche du texte */}
                                <div className="flex flex-col items-start">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                        Responsable
                                    </span>
                                    <p className="text-sm text-gray-800 font-extrabold leading-none">
                                        {data?.entity.owner.first_name} {data?.entity.owner.last_name}
                                    </p>
                                </div>
                            </div>

                            {/* BLOC : TYPE D'ÉTABLISSEMENT */}
                            <div className="flex items-center gap-3 group">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    {/* J'ai mis Landmark ici pour différencier visuellement du User */}
                                    <FaStar className="text-blue-600" size={14} />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Étoiles</span>
                                    <p className="text-sm text-gray-800 font-extrabold leading-none">
                                        {data?.stars || "Non spécifié"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <FaConciergeBell className="text-green-600" size={14} />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Service</span>
                                    <p className="text-sm text-gray-800 font-extrabold leading-none">
                                        {data?.service_offered || "Non spécifié"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 upparcase tracking-[0.2em] mb-4 text-center md:text-left">Informations Générales</span>

                        <div className="bg-gray-100 rounded-2xl p-6 mb-8 flex justify-center items-center shadow-inner min-h-[220px]">
                            {data?.entity.image.image ? (
                                <img
                                    src={getFullImageUrl(data.entity.image.image)}
                                    className="max-h-52 w-auto object-contain rounded-lg shadow-sm "
                                />
                            ) : (
                                <FaBuilding size={60} className="text-gray-300" />
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-gray-100 pt-8">
                            <div className="space-y-5">
                                <div className="group">
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400 upparcase tracking-wider mb-1">
                                        <FaMapMarkerAlt className="text-green-600" />Adresse
                                    </span>
                                    <p className="text-xs text-gray-700 font-medium leading-relaxed italic">
                                        {data?.entity.localisation}
                                    </p>
                                </div>
                                <div>
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400 upparcase tracking-wider mb-1">
                                        <FaMapMarkerAlt className="text-green-600" /> Commune
                                    </span>
                                    <p className="text-xs text-gray-700 font-medium leading-relaxed italic">
                                        {data?.entity.town}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-5 sm:border-x border-gray-100 sm:px-4">
                                <div>
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400  tracking-wider mb-1">
                                        <FaClock className="text-green-600" /> Horaires de travail
                                    </span>
                                    <p className="text-xs text-gray-700 font-semibold italic">
                                        {data?.entity.opening_hours}
                                    </p>
                                </div>
                                <div>
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400  tracking-wider mb-1">
                                        <FaCalendar className="text-green-600" /> Jours ouvrables
                                    </span>
                                    <p className="text-xs text-gray-700 font-semibold tracking-tigth">
                                        {data?.entity.working_day}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400 tracking-wider mb-1">
                                    <FaPhone className="text-green-600" /> Contact direct
                                </span>
                                <p className="text-sm text-gray-900 font-extrabold bg-gray-50 p-2 rounded-lg inline-block border border-gray-100">
                                    {data?.entity.contact}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalHotel
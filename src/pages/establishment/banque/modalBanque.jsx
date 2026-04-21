import React, { useEffect, useState } from "react";
import ApiService from "../../../service/apiService";
import {
    FaLandmark,
    FaMapMarkerAlt,
    FaPhone,
    FaUser,
    FaClock,
    FaCalendarAlt
} from "react-icons/fa";
import UseFetchDataById from "../../../hooks/useFetchDataById";

const ModalBanque = ({ isOpen, onClose, banque }) => {
    // Si le modal n'est pas ouvert, on ne rend rien
    if (!isOpen) return null;

    const { data, isLoading } = UseFetchDataById("get_bank_by_id", banque, isOpen)

    
    if (!data && isLoading) {
        return (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white p-10 rounded-3xl animate-pulse text-pink-600 font-bold">
                    Chargement...
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modal-overlay">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-6 md:p-10 relative overflow-y-auto max-h-[90vh] animate-modal-content">

                {/* Bouton de fermeture (X) */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-6 text-3xl text-gray-400 hover:text-pink-600 transition-colors z-10"
                    aria-label="Fermer"
                >
                    &times;
                </button>

                {/* TITRE PRINCIPAL */}
                <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 text-center mb-8 pb-4 border-b border-gray-100 flex items-center justify-center gap-3">
                    <FaLandmark className="text-pink-600" size={30} />
                    {data?.name || "Détails de l'établissement"}
                </h2>

                <div className="flex flex-col md:flex-row gap-8 md:gap-12">

                    {/* COLONNE GAUCHE : PROPRIÉTAIRE */}
                    <div className="flex-none w-full md:w-1/3 flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Responsable</span>

                        {data?.entity.owner.image_owner.image ? (
                            <img
                                src={`http://localhost:8000${data.entity.owner.image_owner.image}`}
                                alt="Propriétaire"
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md border-4 border-white ring-1 ring-gray-200 mb-4"
                            />
                        ) : (
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                <FaUser size={50} className="text-gray-400" />
                            </div>
                        )}

                        {/* Nom du propriétaire avec icône */}
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <FaUser className="text-pink-600" size={14} />
                            <p className="text-gray-700 font-bold text-sm">
                                {data?.entity.owner.first_name} {data?.entity.owner.last_name}
                            </p>
                        </div>
                    </div>

                    {/* COLONNE DROITE : BANQUE ET INFORMATIONS */}
                    <div className="flex-grow flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 text-center md:text-left">Informations Générales</span>

                        {/* Image de la Banque - Centrée */}
                        <div className="bg-gray-100 rounded-2xl p-6 mb-8 flex justify-center items-center shadow-inner min-h-[220px]">
                            {data?.entity.image.image ? (
                                <img
                                    src={`http://localhost:8000${data.entity.image.image}`}
                                    alt={data.name}
                                    className="max-h-52 w-auto object-contain rounded-lg shadow-sm"
                                />
                            ) : (
                                <FaLandmark size={60} className="text-gray-300" />
                            )}
                        </div>

                        {/* GRILLE D'INFORMATIONS RESPONSIVE */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-gray-100 pt-8">

                            {/* Section Localisation */}
                            <div className="space-y-5">
                                <div className="group">
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400  tracking-wider mb-1">
                                        <FaMapMarkerAlt className="text-blue-600" /> Adresse
                                    </span>
                                    <p className="text-xs text-gray-700 font-medium leading-relaxed italic">
                                        {data?.entity.localisation}
                                    </p>
                                </div>
                                <div>
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400  tracking-wider mb-1">
                                        <FaMapMarkerAlt className="text-blue-600" /> Commune
                                    </span>
                                    <p className="text-xs text-gray-700 font-medium">
                                        {data?.entity.town}
                                    </p>
                                </div>
                            </div>

                            {/* Section Horaires */}
                            <div className="space-y-5 sm:border-x border-gray-100 sm:px-4">
                                <div>
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400  tracking-wider mb-1">
                                        <FaClock className="text-blue-600" /> Horaires de travail
                                    </span>
                                    <p className="text-xs text-gray-700 font-semibold italic">
                                        {data?.entity.opening_hours}
                                    </p>
                                </div>
                                <div>
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400  tracking-wider mb-1">
                                        <FaCalendarAlt className="text-blue-600" /> Jours ouvrables
                                    </span>
                                    <p className="text-xs text-gray-700 font-semibold  tracking-tight">
                                        {data?.entity.working_day}
                                    </p>
                                </div>
                            </div>

                            {/* Section Contact & Web */}
                            <div className="lg:pl-4 space-y-5">
                                <div>
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400  tracking-wider mb-1">
                                        <FaPhone className="text-blue-600" /> Contact direct
                                    </span>
                                    <p className="text-sm text-gray-900 font-extrabold bg-gray-50 p-2 rounded-lg inline-block border border-gray-100">
                                        {data?.entity.contact || "Non renseigné"}
                                    </p>
                                </div>

                                {/* Condition : On affiche ce bloc SEULEMENT si data.entity.site existe */}
                                {data?.entity.link && (
                                    <div>
                                        <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                            <FaLandmark className="text-blue-600" /> Site Internet
                                        </span>
                                        <a
                                            href={data.entity.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-pink-600 font-bold hover:underline break-all"
                                        >
                                            {data.entity.link.replace(/^https?:\/\//, '')}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bouton de pied de page pour fermer */}
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-gray-900 hover:bg-pink-600 text-white font-bold px-12 py-3.5 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-pink-200 uppercase text-xs tracking-widest"
                    >
                        Fermer la fiche
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalBanque;
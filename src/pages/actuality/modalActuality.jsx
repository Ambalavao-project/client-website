import React, { useEffect, useState } from "react";
import ApiService from "../../service/apiService";
import { getFullImageUrl } from "../../utils/imageHelper";

const ModalActuality = ({ isOpen, onClose, actuality }) => {
  if (!isOpen) return null;
  const [actualities, setActualities] = useState(null);

  const fetchActuality = async (id) => {
    try {
      const response = await ApiService.getAll(`get_news_by_id/${id}/`);
      setActualities(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpen && actuality) fetchActuality(actuality);
  }, [isOpen, actuality]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-3xl p-6 relative overflow-y-auto max-h-[85vh] animate-fadeIn">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-3xl text-gray-500 hover:text-pink-600 transition-colors duration-200"
        >
          &times;
        </button>

        <div className="text-left">
          {/* TITRE */}
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 text-center mb-4 opacity-0 animate-fade-in-up delay-0">
            {actualities?.title || "Actualité"}
          </h2>

          {/* IMAGE */}
          {actualities?.image_news?.image && (
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 shadow-md">
              <img
              src={getFullImageUrl(actualities.image_news.image)}
              alt={actualities.title}
              className="w-full h-auto max-h-[400px] object-contain opacity-0 animate-fade-in-up delay-200"
            />
            </div>
          )}

          {/* DESCRIPTION */}
          {actualities?.description && (
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed text-justify whitespace-pre-line mb-4 opacity-0 animate-fade-in-up delay-400">
              {actualities.description}
            </p>
          )}

          {/* DATE & SOURCE */}
          <div className="text-xs sm:text-sm text-gray-500 mt-4 opacity-0 animate-fade-in-up delay-600">
            <span>📅 {actualities?.date || "-"}</span> <br />
            <span>🔗 {actualities?.source || "-"}</span>
          </div>

          {/* BOUTON FERMER */}
          <div className="mt-6 flex justify-center opacity-0 animate-fade-in-up delay-800">
            <button
              onClick={onClose}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition-all duration-200"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalActuality;

import UseFetchDataById from "../../hooks/useFetchDataById"

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
            </div>
        </div>
    )
}

export default ModalHotel
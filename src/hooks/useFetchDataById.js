import { useEffect, useState } from "react"
import ApiService from "../service/apiService"

const UseFetchDataById = (listEndpoint, id, isOpen) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchdata = async() => {
            if (!isOpen || !id) return; 

            setIsLoading(true)
            try{
                const response = await ApiService.getAll(`${listEndpoint}/${id}/`)
                setData(response.data)
            } catch(error) {
                console.error("Erreur lors de la chargement des details:", error)
                setData(null)
            } finally{
                setIsLoading(false)
            }
        }
        fetchdata()

        if(!isOpen) {
            setData(null)
        }
    }, [listEndpoint, id, isOpen])

    return { data, isLoading }
}

export default UseFetchDataById
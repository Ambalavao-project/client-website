import { useEffect, useState } from "react"
import ApiService from "../service/apiService"

const UseFetchData = (listEndpoint, pageNumber = 1, perPage = 3) => {
    const [data, setData] = useState([])
    
    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await ApiService.getAll(
                    `${listEndpoint}/?page=${pageNumber}&per_page=${perPage}`
                )
                setData(response.data.results) 
            } catch(error) {
                console.error("Erreur API:", error)
            }
        }
        fetchData()
    }, [listEndpoint, pageNumber, perPage])

    return {
        data
    }
}

export default UseFetchData
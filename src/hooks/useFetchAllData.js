import { useEffect, useState } from "react"
import ApiService from "../service/apiService"

const UseFetchAllData = (listEndpoint, searchEndPoint, perPage = 6) => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchAllData = async() => {
            setLoading(true)
            try{
                let response;
                if(searchTerm.trim() !== "") {
                    response = await ApiService.getAll(
                        `${searchEndPoint}/?search=${encodeURIComponent(searchTerm)}`
                    )

                    const results = response.data.results || response.data
                    setData(results)
                    setTotal(results.length)

                    if(page !==1) setPage(1)
                } else {
                    response = await ApiService.getAll(
                        `${listEndpoint}/?page=${page}&per_page=${perPage}`
                    )
                    setData(response.data.results || [])
                    setTotal(response.data.total || 0)
                }
            } catch (error) {
                console.error("Erreur API:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchAllData()
    }, [page, searchTerm, listEndpoint, searchEndPoint, perPage])

    const totalPages = Math.ceil(total / perPage)

    return {
        data,
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        totalPages,
        loading,
        total
    }
}

export default UseFetchAllData
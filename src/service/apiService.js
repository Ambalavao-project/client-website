import api from "../data/api"
class ApiService {
    static async getAll(url){
        const response = await api.get(url)
        return response
    }

    static async post(url, body, token){
        const response = await api.post(url, body, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        return response
    }

    static async put(url, body, token){
        const response = await api.put(url, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response
    }

    static async delete(url, token){
        const response = await api.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response
    }
}

export default ApiService
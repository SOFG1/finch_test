import axios from "axios"

const apiUrl = 'https://jsonplaceholder.typicode.com/'

const axiosInstance = axios.create({
    baseURL: apiUrl
})


export const postLotteryResult = async (result: any) => {
    try {
        await axiosInstance.post("posts", result);
        return true
    } catch(e) {
        return false
    }
}
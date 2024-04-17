import axios from "axios"
import { CombinationType } from "./types";

const apiUrl = 'https://jsonplaceholder.typicode.com/'

const axiosInstance = axios.create({
    baseURL: apiUrl
})



export const postLotteryResult = async (selectedNumber: CombinationType, isTicketWon: boolean) => {
    try {
        await axiosInstance.post("posts", {selectedNumber, isTicketWon});
        return true
    } catch(e) {
        return false
    }
}
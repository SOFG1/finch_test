import axios from "axios"
import { CombinationType } from "./types";
import { delay } from "./utils/delay";

const apiUrl = 'https://jsonplaceholder.typicode.com/'

const axiosInstance = axios.create({
    baseURL: apiUrl
})



export const postLotteryResult = async (selectedNumber: CombinationType, isTicketWon: boolean) => {
    try {
        await axiosInstance.post("posts", { selectedNumber, isTicketWon });
        return true
    } catch (e) {
        return false
    }
}


export  const sendDataToAPIRepeatedly = async (comb: CombinationType, isTicketWon: boolean) => {
    const isSuccess = await postLotteryResult(comb, isTicketWon);
    if (isSuccess) return;
    await delay(2000);
    const secondAttemptSuccess = await postLotteryResult(comb, isTicketWon);
    if (secondAttemptSuccess) return;
    await delay(2000);
    const thirdAttemptSuccess = await postLotteryResult(comb, isTicketWon);
    if (thirdAttemptSuccess) return;
    alert("Ошибка при отправке данных на сервер");
  };

import axios from "axios";
import { CombinationType } from "./types";
import { delay } from "./utils/delay";

const apiUrl = "https://jsonplaceholder.typicode.com/";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

export const postLotteryResult = async (
  selectedNumber: CombinationType,
  isTicketWon: boolean
) => {
  try {
    await axiosInstance.post("posts", { selectedNumber, isTicketWon });
    return true;
  } catch (e) {
    return false;
  }
};

export const sendDataToAPIRepeatedly = async (
  comb: CombinationType,
  isTicketWon: boolean
) => {
  let attempt = 0;

  const sendAttempt = async () => {
    const isSuccess = await postLotteryResult(comb, isTicketWon);
    if (isSuccess) return;
    attempt++;
    if (attempt > 2) {
      alert("Ошибка при отправке данных на сервер");
      return;
    }
    await delay(2000)
    sendAttempt();
  };
  sendAttempt()
};

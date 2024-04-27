import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import wandIcon from "../images/magic-wand.svg";
import Button from "../UI/Button";
import { generateRandomCombination } from "../utils/generateRandomCombination";
import { checkWinningCombination } from "../utils/checkWinningCombination";
import { FIRST_FIELD_SIZE, SELECTED_IN_FIRST_FIELD } from "../constants";
import { CombinationType } from "../types";
import { postLotteryResult } from "../api";
import { delay } from "../utils/delay";

const StyledWrapper = styled.div`
  padding: 14px 11px 24px;
  background: #fff;
  border-radius: 3px;
  width: fit-content;
  min-height: 368px;
  width: 302px;
  @media screen and (max-width: 320px) {
    width: 100%;
  }
`;

const StyledMessage = styled.p`
  font-weight: 300;
  font-size: 14px;
  margin-top: 10px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const StyledTitle = styled.p``;

const StyledSubtitle = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  span {
    font-weight: 300;
  }
`;

const StyledBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const StyledNumber = styled.button<{ selected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  border: 1px solid #dddddd;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    background-color: #dddddd;
  }
  ${({ selected }) =>
    selected &&
    `
        background-color: #FFD205;
        border: none;
        transform: scale(0.9);
    `}
`;

const StyledButton = styled(Button)`
  margin: 23px auto 0;
`;

const GenerateButton = styled.button`
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

export const TicketView = React.memo(() => {
  const [firstField, setFirstField] = useState<number[]>([]);
  const [secondField, setSecondField] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const allSelected = useMemo(() => {
    return firstField.length === SELECTED_IN_FIRST_FIELD && secondField.length === 1;
  }, [firstField, secondField]);

  const generateRandomly = useCallback(() => {
    const combination = generateRandomCombination();
    setFirstField(combination.firstField);
    setSecondField(combination.secondField);
  }, []);

  const handleSelectFirst = useCallback(
    (number: number) => {
      if (!firstField.includes(number) && firstField.length < SELECTED_IN_FIRST_FIELD) {
        setFirstField((p) => [...p, number]);
        return;
      }
      setFirstField((p) => p.filter((n) => n !== number));
    },
    [firstField]
  );

  const handleSelectSecond = useCallback(
    (number: number) => {
      if (secondField.includes(number)) {
        setSecondField((p) => p.filter((n) => n !== number));
        return;
      }
      setSecondField([number]);
    },
    [secondField]
  );

  const sendDataToAPI = useCallback(
    async (comb: CombinationType, isTicketWon: boolean) => {
      const isSuccess = await postLotteryResult(comb, isTicketWon);
      if (isSuccess) return;
      await delay(2000);
      const secondAttemptSuccess = await postLotteryResult(comb, isTicketWon);
      if (secondAttemptSuccess) return;
      await delay(2000);
      const thirdAttemptSuccess = await postLotteryResult(comb, isTicketWon);
      if (thirdAttemptSuccess) return;
      alert("Ошибка при отправке данных на сервер");
    },
    []
  );

  const handleSubmit = useCallback(() => {
    const userCombination = { firstField, secondField };
    const winningCombination = generateRandomCombination();
    const won = checkWinningCombination(userCombination, winningCombination);
    if (won) setMessage("Ого, вы выиграли! Поздравляем!");
    if (!won) setMessage("К сожалению, вы не выиграли.");
    sendDataToAPI(userCombination, won);
  }, [firstField, secondField, sendDataToAPI]);

  if (message) {
    return (
      <StyledWrapper>
        <StyledTitle>Билет 1</StyledTitle>
        <StyledMessage>{message}</StyledMessage>
      </StyledWrapper>
    );
  }


  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledTitle>Билет 1</StyledTitle>
        <GenerateButton
          title="Выгбрать автоматически"
          onClick={generateRandomly}
        >
          <img src={wandIcon} alt="Wand icon" />
        </GenerateButton>
      </StyledHeader>

      <StyledSubtitle>
        Поле 1 <span>Отметьте {SELECTED_IN_FIRST_FIELD} чисел.</span>
      </StyledSubtitle>
 
      <StyledBox>
        {[...Array(FIRST_FIELD_SIZE).keys()].map((n: number) => {
          return (
            <StyledNumber
              key={n}
              selected={firstField.includes(n)}
              onClick={() => handleSelectFirst(n)}
            >
              {n}
            </StyledNumber>
          );
        })}
      </StyledBox>

      <StyledSubtitle>
        Поле 2 <span>Отметьте 1 число.</span>
      </StyledSubtitle>

      <StyledBox>
        <StyledNumber
          selected={secondField.includes(1)}
          onClick={() => handleSelectSecond(1)}
        >
          1
        </StyledNumber>
        <StyledNumber
          selected={secondField.includes(2)}
          onClick={() => handleSelectSecond(2)}
        >
          2
        </StyledNumber>
      </StyledBox>

      <StyledButton onClick={handleSubmit} disabled={!allSelected}>
        Показать результат
      </StyledButton>
    </StyledWrapper>
  );
});

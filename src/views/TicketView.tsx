import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Button from "../UI/Button";
import { generateRandomCombination } from "../utils/generateRandomCombination";
import { checkWinningCombination } from "../utils/checkWinningCombination";
import {
  FIRST_FIELD_SIZE,
  SECOND_FIELD_SIZE,
  SELECTED_IN_FIRST_FIELD,
  SELECTED_IN_SECOND_FIELD,
} from "../constants";
import { CombinationType } from "../types";
import { postLotteryResult } from "../api";
import { delay } from "../utils/delay";
import { TickerHeaderComponent } from "../components/TicketHeaderComponent";
import { NumbersListComponent } from "../components/NumbersListComponent";

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

const StyledButton = styled(Button)`
  margin: 23px auto 0;
`;

export const TicketView = React.memo(() => {
  const [firstField, setFirstField] = useState<number[]>([]);
  const [secondField, setSecondField] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const allSelected = useMemo(() => {
    return (
      firstField.length === SELECTED_IN_FIRST_FIELD && secondField.length === 1
    );
  }, [firstField, secondField]);

  const generateRandomly = useCallback(() => {
    const combination = generateRandomCombination();
    setFirstField(combination.firstField);
    setSecondField(combination.secondField);
  }, []);

  const handleSelectFirst = useCallback(
    (number: number) => {
      if (
        !firstField.includes(number) &&
        firstField.length < SELECTED_IN_FIRST_FIELD
      ) {
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
        <p>Билет 1</p>
        <StyledMessage>{message}</StyledMessage>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <TickerHeaderComponent generateRandomly={generateRandomly} />
      <NumbersListComponent
        number={1}
        size={FIRST_FIELD_SIZE}
        selectedCount={SELECTED_IN_FIRST_FIELD}
        field={firstField}
        onSelect={handleSelectFirst}
      />

      <NumbersListComponent
        number={2}
        size={SECOND_FIELD_SIZE}
        selectedCount={SELECTED_IN_SECOND_FIELD}
        field={secondField}
        onSelect={handleSelectSecond}
      />

      <StyledButton onClick={handleSubmit} disabled={!allSelected}>
        Показать результат
      </StyledButton>
    </StyledWrapper>
  );
});

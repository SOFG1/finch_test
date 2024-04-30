import { useState } from "react";
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
import { sendDataToAPIRepeatedly } from "../api";
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

export const TicketView = () => {
  const [firstField, setFirstField] = useState<number[]>([]);
  const [secondField, setSecondField] = useState<number[]>([]);
  const [won, setWon] = useState<undefined | boolean>();

  const allSelected =
    firstField.length === SELECTED_IN_FIRST_FIELD && secondField.length === 1;

  const generateRandomly = () => {
    const combination = generateRandomCombination();
    setFirstField(combination.firstField);
    setSecondField(combination.secondField);
  };

  const handleSelectFirst = (number: number) => {
    if (
      !firstField.includes(number) &&
      firstField.length < SELECTED_IN_FIRST_FIELD
    ) {
      setFirstField((p) => [...p, number]);
      return;
    }
    setFirstField((p) => p.filter((n) => n !== number));
  };

  const handleSelectSecond = (number: number) => {
    if (secondField.includes(number)) {
      setSecondField((p) => p.filter((n) => n !== number));
      return;
    }
    setSecondField([number]);
  };

  const handleSubmit = () => {
    const userCombination = { firstField, secondField };
    const winningCombination = generateRandomCombination();
    const won = checkWinningCombination(userCombination, winningCombination);
    setWon(won);
    sendDataToAPIRepeatedly(userCombination, won);
  };

  if (won !== undefined) {
    return (
      <StyledWrapper>
        <p>Билет 1</p>
        {won === true && (
          <StyledMessage>Ого, вы выиграли! Поздравляем!</StyledMessage>
        )}
        {won === false && (
          <StyledMessage>К сожалению, вы не выиграли.</StyledMessage>
        )}
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
};

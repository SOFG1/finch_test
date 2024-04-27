import React from "react";
import styled from "styled-components";
import wandIcon from "../images/magic-wand.svg";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const GenerateButton = styled.button`
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;


interface IProps {
  generateRandomly: () => void;
}

export const TickerHeaderComponent = React.memo(({ generateRandomly }: IProps) => {
  return (
    <>
      <StyledHeader>
        <p>Билет 1</p>
        <GenerateButton
          title="Выгбрать автоматически"
          onClick={generateRandomly}
        >
          <img src={wandIcon} alt="Wand icon" />
        </GenerateButton>
      </StyledHeader>
    </>
  );
});


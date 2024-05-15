import React from "react";
import styled from "styled-components";

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

const StyledSubtitle = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  span {
    font-weight: 300;
  }
`;

interface IProps {
  number: number;
  selectedCount: number;
  size: number;
  field: number[];
  onSelect: (n: number) => void;
}

export const NumbersListComponent = React.memo(
  ({ number, selectedCount, size, field, onSelect }: IProps) => {
    return (
      <>
        <StyledSubtitle>
          Поле {number} <span>Отметьте {selectedCount} чисел.</span>
        </StyledSubtitle>  
        <StyledBox>
          {[...Array(size).keys()].map((n: number) => {
            const num = n + 1;
            return (
              <StyledNumber
                key={num}
                selected={field.includes(num)}
                onClick={() => onSelect(num)}
              >
                {num}
              </StyledNumber>
            );
          })}
        </StyledBox>
      </>
    );
  }
);

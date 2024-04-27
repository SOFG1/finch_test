import {
  FIRST_FIELD_SIZE,
  SECOND_FIELD_SIZE,
  SELECTED_IN_FIRST_FIELD,
  SELECTED_IN_SECOND_FIELD,
} from "../constants";
import { CombinationType } from "../types";
import { generateRandomNumber } from "./generateRandomNumber";

const fillField = (size: number, selected: number) => {
  const fieldArray: number[] = [];

  while (fieldArray.length < selected) {
    const num = generateRandomNumber(1, size);
    if (!fieldArray.includes(num)) {
      fieldArray.push(num);
    }
  }

  return fieldArray;
};

export const generateRandomCombination = (): CombinationType => {
  const firstField: number[] = fillField(
    FIRST_FIELD_SIZE,
    SELECTED_IN_FIRST_FIELD
  );
  const secondField: number[] = fillField(
    SECOND_FIELD_SIZE,
    SELECTED_IN_SECOND_FIELD
  );

  return {
    firstField,
    secondField,
  };
};

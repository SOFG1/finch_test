import { FIRST_FIELD_SIZE, SELECTED_IN_FIRST_FIELD } from "../constants"
import { CombinationType } from "../types"
import { generateRandomNumber } from "./generateRandomNumber"



export const generateRandomCombination = (): CombinationType => {
    const firstField: number[] = []
    while (firstField.length < SELECTED_IN_FIRST_FIELD) {
        const num = generateRandomNumber(1, FIRST_FIELD_SIZE)
        if (!firstField.includes(num)) {
            firstField.push(num)
        }
    }
    const secondField = [generateRandomNumber(1, 2)]
    return {
        firstField,
        secondField
    }

}
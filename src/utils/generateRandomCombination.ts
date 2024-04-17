import { FIRST_FIELD_NUMBERS } from "../constants"
import { CombinationType } from "../types"
import { generateRandomNumber } from "./generateRandomNumber"



export const generateRandomCombination = (): CombinationType => {
    const firstField: number[] = []
    while(firstField.length < 8) {
        const num = generateRandomNumber(1, FIRST_FIELD_NUMBERS.length)
        if(!firstField.includes(num)) {
            firstField.push(num)
        }
    }
    const secondField = [generateRandomNumber(1,2)]
    return {
        firstField,
        secondField
    }

}
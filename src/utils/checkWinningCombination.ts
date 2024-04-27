import { CombinationType } from "../types"





export const checkWinningCombination = (combination: CombinationType, winningComb: CombinationType) => {

    const firstFieldMatches = combination.firstField.filter(n => winningComb.firstField.includes(n)).length
    const secondFieldMatches = combination.secondField.filter(n => winningComb.secondField.includes(n)).length

    if (firstFieldMatches > 3) return true
    if (firstFieldMatches > 2 && secondFieldMatches > 0) return true

    return false
}
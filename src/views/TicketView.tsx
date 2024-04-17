import React, { useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import wandIcon from "../images/magic-wand.svg"
import Button from "../UI/Button"
import { generateRandomNumber } from "../utils/generateRandomNumber"

const firstColumnNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const StyledWrapper = styled.div`
    padding: 14px 11px 24px;
    background: #fff;
    border-radius: 3px;
    width: fit-content;
`


const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`

const StyledTitle = styled.p`
    
`

const StyledSubtitle = styled.p`
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 8px;
    span {
        font-weight: 300;
    }
`

const StyledBox = styled.div`
    max-width: 274px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
`

const StyledNumber = styled.button<{ selected?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    height: 40px;
    width: 40px;
    border-radius: 5px;
    border: 1px solid #DDDDDD;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    transition: 200ms;
    &:hover {
        background-color: #dddddd;
    }
    ${({ selected }) => selected && `
        background-color: #FFD205;
        border: none;
        transform: scale(0.9);
    `}
`

const StyledButton = styled(Button)`
    margin: 23px auto 0;
`

const GenerateButton = styled.button`
    padding: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
`

export const TicketView = React.memo(() => {
    const [firstField, setFirstField] = useState<number[]>([])
    const [secondField, setSecondField] = useState<number[]>([])


    const allSelected = useMemo(() => {
        return (firstField.length === 8 && secondField.length === 1)
    }, [firstField, secondField])


    const generateRandomly = useCallback(() => {
        const firstField: number[] = []
        while(firstField.length < 8) {
            const num = generateRandomNumber(1, 12)
            if(!firstField.includes(num)) {
                firstField.push(num)
            }
        }
        setFirstField(firstField)
        const secondField = [generateRandomNumber(1,2)]
        setSecondField(secondField)
    }, [])


    const handleSelectFirst = useCallback((number: number) => {
        if (!firstField.includes(number) && firstField.length < 8) {
            setFirstField(p => ([...p, number]))
            return
        }
        setFirstField(p => p.filter(n => n !== number))
    }, [firstField])

    const handleSelectSecond = useCallback((number: number) => {
        if(secondField.includes(number)) {
            setSecondField(p => p.filter(n => n !== number))
            return
        }
        setSecondField([number])
    }, [secondField])


    const handleSubmit = useCallback(() => {
        
    }, [firstField, secondField])



    return <StyledWrapper>

        <StyledHeader>
            <StyledTitle>Билет 1</StyledTitle>
            <GenerateButton title="Выгбрать случайно" onClick={generateRandomly}><img src={wandIcon} alt="Wand icon" /></GenerateButton>
        </StyledHeader>

        <StyledSubtitle>
            Поле 1 <span>Отметьте 8 чисел.</span>
        </StyledSubtitle>

        <StyledBox>
            {firstColumnNumbers.map((n: number) => {
                return <StyledNumber key={n} selected={firstField.includes(n)} onClick={() => handleSelectFirst(n)}>{n}</StyledNumber>
            })}
        </StyledBox>


        <StyledSubtitle>
            Поле 2 <span>Отметьте 1 число.</span>
        </StyledSubtitle>

        <StyledBox>
            <StyledNumber selected={secondField.includes(1)} onClick={() => handleSelectSecond(1)}>1</StyledNumber>
            <StyledNumber selected={secondField.includes(2)} onClick={() => handleSelectSecond(2)}>2</StyledNumber>
        </StyledBox>

        <StyledButton disabled={!allSelected}>Показать результат</StyledButton>

    </StyledWrapper>
})
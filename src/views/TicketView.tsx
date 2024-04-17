import React from "react"
import styled from "styled-components"
import wandIcon from "../images/magic-wand.svg"
import Button from "../UI/Button"

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

const StyledNumber = styled.button<{selected?: boolean}>`
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
    ${({selected}) => selected && `
        background-color: #FFD205;
        border: none;
        transform: scale(0.9);
    `}
`

const StyledButton = styled(Button)`
    margin: 23px auto 0;
`

export const TicketView = React.memo(() => {
    return <StyledWrapper>
        <StyledHeader>
            <StyledTitle>Билет 1</StyledTitle>
            <img src={wandIcon} alt="Wand icon" />
        </StyledHeader>
        <StyledSubtitle>
            Поле 1 <span>Отметьте 8 чисел.</span>
        </StyledSubtitle>
        <StyledBox>
            <StyledNumber>1</StyledNumber>
            <StyledNumber>2</StyledNumber>
            <StyledNumber>3</StyledNumber>
            <StyledNumber>4</StyledNumber>
            <StyledNumber selected={true}>5</StyledNumber>
            <StyledNumber>6</StyledNumber>
            <StyledNumber>7</StyledNumber>
            <StyledNumber>8</StyledNumber>
            <StyledNumber>9</StyledNumber>
            <StyledNumber>10</StyledNumber>
            <StyledNumber>11</StyledNumber>
            <StyledNumber>12</StyledNumber>
        </StyledBox>


        <StyledSubtitle>
            Поле 2 <span>Отметьте 1 число.</span>
        </StyledSubtitle>

        <StyledBox>
            <StyledNumber>1</StyledNumber>
            <StyledNumber>2</StyledNumber>
        </StyledBox>
        <StyledButton>Показать результат</StyledButton>
    </StyledWrapper>
})
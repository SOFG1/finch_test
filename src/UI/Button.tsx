import styled from "styled-components"

const StyledButton = styled.button`
    display: block;
    width: fit-content;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.64);
    padding: 13px 22px;
    border: 1px solid #DDDDDD;
    background-color: transparent;
    border-radius: 40px;
    cursor: pointer;
    transition: 200ms;
    &:disabled {
        cursor: not-allowed;
    }
    &:hover {
        background-color: #dddddd;
    }
`


interface IProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    disabled?: boolean
}

export const Button = ({ children, className, onClick, disabled }: IProps) => {
    return <StyledButton onClick={onClick} className={className} disabled={disabled}>{children}</StyledButton>
}


export default Button
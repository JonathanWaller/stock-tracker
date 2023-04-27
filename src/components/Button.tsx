import React, {MouseEvent} from 'react'
import CSS from 'csstype';
import styled from 'styled-components'

import { BLACK, LIGHT_GRAY, RED, WHITE, GREEN } from '../styles/colors';

const StyledButton = styled.div<{disabled: boolean, type: 'primary'|'danger'}>`
    border-radius: 4px;

    ${({disabled, type}) => disabled ? `
        background-color: ${LIGHT_GRAY};
        color: ${BLACK}66;

        &:hover {
            cursor: not-allowed;
        }
    ` : type === 'danger' ? `
        background-color: ${RED};
        color: ${WHITE};

        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    ` : `
        background-color: ${GREEN};
        color: ${WHITE};

        &:hover {
            cursor: pointer;
            filter: brightness(.95);
            text-decoration: underline;
        }
    `}

    transition: background-color ease-in-out 150ms;

    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;

    font-weight: 400;
    font-size: 14px;
    line-height: 12px;
    text-align: center;
    font-feature-settings: 'liga' off;
`

interface ButtonProps {
    children: React.ReactNode;
    type: 'primary' |  'danger';
    disabled?: boolean;
    onClick: (e?: MouseEvent) => void;
    style?: CSS.Properties;
}

const Button: React.FC<ButtonProps> = ({ children, type, disabled, onClick, style }) => {
  return (
    <StyledButton type={type} disabled={!!disabled} onClick={disabled ? ()=>{} : onClick} style={style}>
        {children}
    </StyledButton>
  )
}


export default Button;
import React from 'react'
import CSS from 'csstype';
import styled from 'styled-components'

import { SUPPORT_APP_BLACK, SUPPORT_APP_LIGHT_GRAY, SUPPORT_APP_RED, SUPPORT_APP_WHITE, SUPPORT_APP_GREEN } from '../styles/colors';

const StyledButton = styled.div<{disabled: boolean, type: 'primary'|'danger'}>`
    border-radius: 4px;

    ${({disabled, type}) => disabled ? `
        background-color: ${SUPPORT_APP_LIGHT_GRAY};
        color: ${SUPPORT_APP_BLACK}66;

        &:hover {
            cursor: not-allowed;
        }
    ` : type === 'danger' ? `
        background-color: ${SUPPORT_APP_RED};
        color: ${SUPPORT_APP_WHITE};

        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    ` : `
        background-color: ${SUPPORT_APP_GREEN};
        color: ${SUPPORT_APP_WHITE};

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
    onClick: (e?: any) => void;
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
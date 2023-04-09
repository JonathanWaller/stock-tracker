import styled from 'styled-components'
import { breakpointsOld } from './breakpoints'
import { primaryDark, red, secondaryDark, SUPPORT_APP_BLACK, SUPPORT_APP_RED, tertiaryDark } from './colors'

export const sora = `font-family: Sora, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;`
export const manrope = `font-family: Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;`


export const LabelText = styled.h6`
    ${manrope}
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    color: ${SUPPORT_APP_BLACK};
`

export const HeaderText = styled.h1`
    ${sora}

    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: 0.01em;
    color: ${SUPPORT_APP_BLACK};

    word-break: break-word;
`

export const SubheaderText = styled.p`
    ${manrope}
    font-size: 14px;
    line-height: 18px;

    font-feature-settings: 'liga' off;

    color: ${tertiaryDark};
`

export const NavLinkHeader = styled.h3`
    color: ${SUPPORT_APP_BLACK};
    ${sora}
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.01em;
`

export const NavLinkSubheader = styled.p`
    ${manrope}
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: ${secondaryDark};
`

export const TagText = styled.h6`  
    font-style: normal;
    font-weight: 700;
    font-size: 9px;
    line-height: 9px;
    text-align: right;
    letter-spacing: 0.01em;
    text-transform: uppercase;
`

// New typography for full support app  -----------------------------------------------------------------------------

export const LargeHeader = styled.h1`
    ${sora}
    font-weight: 400;
    font-size: 32px;
    line-height: 40px;

    color: ${SUPPORT_APP_BLACK};

    @media only screen and (max-width: ${breakpointsOld.sm}px) {
        font-size: 24px;
        line-height: 30px;
    }
`

export const SettingsSectionLabel = styled.h4`
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.03em;
    color: ${SUPPORT_APP_BLACK}66;
`

export const SettingsItemLabel = styled.h6`
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: ${SUPPORT_APP_BLACK}4D;
`

export const SecondaryActionText = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    font-feature-settings: 'liga' off;

    color: ${SUPPORT_APP_BLACK}66;
`

export const ErrorText = styled.p`
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.01em;

    color: ${SUPPORT_APP_RED};
`
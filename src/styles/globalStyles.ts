import { createGlobalStyle } from "styled-components";
import { SUPPORT_APP_BLACK } from "./colors";


export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Sora';
        src: url('/fonts/Sora-VariableFont_wght.ttf') format('truetype');
        font-weight: 300 800;
        font-style: normal;
    }

    @font-face {
        font-family: 'Manrope';
        src: url('/fonts/Manrope-VariableFont_wght.ttf') format('truetype');
        font-weight: 300 800;
        font-style: normal;
    }

    body {
      margin: 0;
      font-family: Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
  
      background: ${SUPPORT_APP_BLACK};
      height: 100vh;
      overflow: hidden;
    }
      
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
      
    * {
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }

    h1, h2, h3, h4, h5, h6, p {
      margin: 0;
    }

    #root {
      width: 100%;
      height: 100%;
    }
`
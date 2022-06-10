import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from 'hydroswap-uikitv2'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: "Droidiga", 'Montserrat', sans-serif;
   
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }

  @font-face {
    font-family:"Droidiga" ;
    src: url('./fonts/Droidiga.otf') format("opentype");
  }
`

export default GlobalStyle

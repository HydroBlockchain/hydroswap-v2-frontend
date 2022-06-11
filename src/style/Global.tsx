import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from 'hydroswap-uikitv2'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
    
  }

  .dSUpqp {
    min-height: 80vh !important;
}

.hfvWqC {
  min-height: 80vh !important;
}
  body {
    background-color: ${({ theme }) => theme.colors.background};
    

    img {
      height: auto;
      max-width: 100%;
    }
  }
  
`

export default GlobalStyle

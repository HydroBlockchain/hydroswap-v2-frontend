import styled from 'styled-components'
import { Card } from 'hydroswap-uikitv2'

export const StyledCard = styled(Card)<{ isFinished?: boolean }>`
  min-width: 280px;
  max-width: 100%;
  margin: 0 0 24px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 750px;
    margin: 0 12px 48px;
  }
`

export default StyledCard

// export const StyledVideo = styled(Card)`
//    min-width: 280px;
//   max-width: 100%;
//   margin: 0 0 24px 0;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-self: baseline;
//   position: relative;

//   ${({ theme }) => theme.mediaQueries.sm} {
//     max-width: 650px;
//     margin: 0 12px 48px;
//   }

//   @media (min-width:1444px){
//     margin-bottom: 32rem;
//   }
// `

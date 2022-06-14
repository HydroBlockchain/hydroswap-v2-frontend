import { Box } from 'hydroswap-uikitv2'
import styled from 'styled-components'

export const StyledPriceChart = styled(Box)<{
  $isDark: boolean
  $isExpanded: boolean
  $isFullWidthContainer?: boolean
}>`
  border: none;
  width: 80%;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 8px;
    background: ${({ $isDark }) => ($isDark ? 'rgba(39, 38, 44, 0.5)' : 'rgba(255, 255, 255, 0.5)')};
    border: ${({ theme }) => `1px solid ${theme.colors.cardBorder}`};
    border-radius: ${({ $isExpanded }) => ($isExpanded ? '0' : '16px')};
    width: ${({ $isExpanded, $isFullWidthContainer }) => ($isFullWidthContainer || $isExpanded ? '70%' : '70%')};
    height: ${({ $isExpanded }) => ($isExpanded ? 'calc(100vh - 100px)' : '435px')};
  }
  padding-top: 0px!important;
  border-radius: 24px!important;
  `

StyledPriceChart.defaultProps = {
  height: '70%',
}

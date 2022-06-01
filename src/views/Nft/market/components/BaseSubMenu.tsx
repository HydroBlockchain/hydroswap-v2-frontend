import { SubMenuItems } from 'hydroswap-uikitv2'
import styled from 'styled-components'

const BaseSubMenu = styled(SubMenuItems)`
  background-color: transparent;
  border-bottom: 1px ${({ theme }) => theme.colors.cardBorder} solid;
`

export default BaseSubMenu

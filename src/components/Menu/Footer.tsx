import { memo } from 'react'
import styled from 'styled-components'
import {  LinkExternal, Flex} from 'hydroswap-uikitv2'
import { useTranslation } from 'contexts/Localization'
import { EXCHANGE_DOCS_URLS } from 'config/constants'

const Wrapper = memo(styled.div<{ $isSide: boolean }>`
  width: 100%;
  height: ${({ $isSide }) => ($isSide ? '100%' : 'auto')};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 16px;
  padding-right: ${({ $isSide }) => ($isSide ? '32px' : '0px')};
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: space-between;
    flex-direction: ${({ $isSide }) => ($isSide ? 'column' : 'row')};
  }
`)

type FooterVariant = 'default' | 'side'

const Footer: React.FC<{ variant?: FooterVariant; helpUrl?: string }> = ({
  variant = 'default',
  helpUrl = EXCHANGE_DOCS_URLS,
}) => {
  const { t } = useTranslation()
  const isSide = variant === 'side'
  return (
    <Wrapper $isSide={isSide}>
      <Flex 
      mt={'2rem'}
      mb={'2rem'}
      flexDirection={isSide ? 'column' : ['column', 'column', 'row']} alignItems="center">
        <LinkExternal
          id="ercBridge"
          href=""
          ml={[0, 0, '40px']}
          mt={['20px', '20px', isSide ? '20px' : 0]}
          mb={['8px', '8px', 0]}
        >
          {t('Convert ERC-20 to BEP-20')}
        </LinkExternal>
      </Flex>
      {isSide && <Flex flexGrow={1} />}
    </Wrapper>
  )
}

export default memo(Footer)

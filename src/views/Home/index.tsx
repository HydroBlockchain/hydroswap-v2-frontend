import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { Image, Flex, Button, Text, useMatchBreakpoints } from 'hydroswap-uikitv2'
import { NextLinkFromReactRouter } from 'components/NextLink'
import Hero from './components/Hero'

import UserBanner from './components/UserBanner'
import MultipleBanner from './components/Banners/MultipleBanner'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
`
const Page = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100% ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    position: relative;
  }
`
const Image1 = styled.div`
  margin-bottom: 30px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
  }
`

const Image2 = styled.div`
  margin-bottom: 30px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
  }
`

const Home: React.FC = () => {
  const { theme } = useTheme()
  const { account } = useWeb3React()
  const { isMobile, isTablet } = useMatchBreakpoints()

  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }

  const { t } = useTranslation()

  return (
    <>
      <PageMeta />
      <Page>
        {isMobile || isTablet ? (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              src={theme.isDark ? '/images/logo-dm.svg' : '/images/logo-lm.svg'}
              width={480}
              height={120}
              mb="30px"
            />
            <Image src="/images/hero.png" width={648} height={450} mb="30px" />
          </div>
        ) : (
          <Image
            src={theme.isDark ? '/images/logo.png' : '/images/logo-black.png'}
            width={1024}
            height={500}
            mb="30px"
            mt="20px"
          />
        )}
      </Page>
    </>
  )
}

export default Home

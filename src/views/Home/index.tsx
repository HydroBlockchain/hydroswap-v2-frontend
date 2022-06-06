import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { Image, Flex, Button, Text } from 'hydroswap-uikitv2'
import { NextLinkFromReactRouter } from 'components/NextLink'
import Hero from './components/Hero'
import MetricsSection from './components/MetricsSection'

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

const Home: React.FC = () => {
  const { theme } = useTheme()
  const { account } = useWeb3React()

  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }

  const { t } = useTranslation()

  return (
    <>
      <PageMeta />
      {/* <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        background={
          theme.isDark
            ? 'radial-gradient(103.12% 50% at 50% 50%, #21193A 0%, #191326 100%)'
            : 'linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        {account && (
          <UserBannerWrapper>
            <UserBanner />
          </UserBannerWrapper>
        )}
        <MultipleBanner />
        <Hero />
      </StyledHeroSection> */}
      <Flex  justifyContent='center' >
        <Image 
          src={
            theme.isDark ?
            '/images/logo.svg':
            '/images/logo-black.svg' 
          }
          width={1024} height={300}
            />
      </Flex>
      <Flex justifyContent='center' mb="8rem">
        <NextLinkFromReactRouter to="swap">
          <Button mr="10px" width={['100%', null, null, 'auto']} variant="secondary">
            <Text color="primary" bold>
              {t('Swap')}
            </Text>
          </Button>
        </NextLinkFromReactRouter>
        <NextLinkFromReactRouter to="pools">
          <Button width={['100%', null, null, 'auto']} variant="secondary">
            <Text color="primary" bold>
              {t('Stake')}
            </Text>
          </Button>
        </NextLinkFromReactRouter>
      </Flex>
    </>
  )
}

export default Home

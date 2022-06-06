import { Flex, IconButton, CogIcon, useModal } from 'hydroswap-uikitv2'
import SettingsModal from './SettingsModal'

type Props = {
  color?: string
  mr?: string
}

const GlobalSettings = ({ color, mr = '32px' }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex>
      <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm" mr={mr} 
      ml='30px'
      mb='-6px'
      id="open-settings-dialog-button">
        {/* Settings */}
        <span style={{
          display: 'inline-block',
        }}>
          Settings
        </span>
        {/* <CogIcon height={24} width={24} color={color || 'textSubtle'} /> */}
      </IconButton>
    </Flex>
  )
}

export default GlobalSettings

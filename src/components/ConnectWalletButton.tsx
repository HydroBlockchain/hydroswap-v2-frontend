import { Button, useWalletModal, ButtonProps } from 'hydroswap-uikitv2'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import Trans from './Trans'

const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <Button onClick={onPresentConnectModal} {...props} >
      {children || <Trans>Connect Wallet</Trans>}
    </Button>
  )
}

export default ConnectWalletButton

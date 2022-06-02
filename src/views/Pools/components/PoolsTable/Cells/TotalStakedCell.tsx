import { useMemo } from 'react'
import { Flex, Skeleton, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { DeserializedPool } from 'state/types'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import BaseCell, { CellContent } from './BaseCell'

interface TotalStakedCellProps {
  pool: DeserializedPool
}

const StyledCell = styled(BaseCell)`
  flex: 2 0 100px;
`

const TotalStakedCell: React.FC<TotalStakedCellProps> = ({ pool }) => {
  const { t } = useTranslation()
  const { stakingToken, totalStaked, vaultKey, userData } = pool
  const { totalCakeInVault } = useVaultPoolByKey(vaultKey)

  const totalStakedBalance = useMemo(() => {
    if (vaultKey) {
      return getBalanceNumber(totalCakeInVault, stakingToken.decimals)
    }

    return getBalanceNumber(totalStaked, stakingToken.decimals)
  }, [vaultKey, totalCakeInVault, totalStaked, stakingToken.decimals])

  // const totalStakedBalance2 = async () => {
    
  // }

  // export const fetchPoolsTotalStaking = async () => {
  //   const poolsTotalStaked = await multicall(erc20ABI, poolsBalanceOf)
  //   console.log(poolsTotalStaked.toString(), 'poolsTotalStaked')
  //   return poolsConfig.map((p, index) => ({
  //     sousId: p.sousId,
  //     totalStaked: new BigNumber(poolsTotalStaked[index]).toJSON(),
  //   }))
  // }

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {t('Total staked')}
        </Text>
        {totalStaked && totalStaked.gte(0) ? (
          <Flex height="20px" alignItems="center">
            <Balance fontSize="16px" value={totalStakedBalance} decimals={0} unit={` ${stakingToken.symbol}`} />
          </Flex>
        ) : (
          <Skeleton width="80px" height="16px" />
        )}
      </CellContent>
    </StyledCell>
  )
}

export default TotalStakedCell

import { useEffect } from 'react'
import { Flex, Label } from '@zoralabs/zord'

// @noun-auction
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { useCountdown } from '@noun-auction/hooks/useCountdown'
import { SharedDataRendererProps } from '@noun-auction/typings'

// @shared
import { lightFont } from 'styles/styles.css'

export function AuctionCountdown({
  startTime,
  endTime,
  showLabels,
  endedCopy = 'Bidding & Settling',
  label = 'Ends in',
  layoutDirection = 'row',
  ...props
}: {
  startTime: string
  endTime: string
  endedCopy?: string
} & SharedDataRendererProps) {
  const { setTimerComplete } = useNounishAuctionProvider()

  if (!startTime || !endTime) return null

  const { text, isEnded } = useCountdown(startTime, endTime)

  useEffect(() => {
    if (isEnded) {
      setTimerComplete(true)
    }
  }, [isEnded, text])

  return (
    <Flex direction={layoutDirection} wrap="wrap" {...props}>
      {showLabels && (
        <Label
          size="md"
          className={lightFont}
          color="secondary"
          style={{ lineHeight: '1.15' }}
          align="right"
        >
          {!isEnded ? label : 'Status'}&nbsp;
        </Label>
      )}
      {!isEnded ? (
        <Label size="md" style={{ lineHeight: '1.15' }} align="right">
          {text}
        </Label>
      ) : (
        <Label size="md" style={{ lineHeight: '1.15' }} align="right">
          {endedCopy}
        </Label>
      )}
    </Flex>
  )
}

import type { NextPage } from 'next'
import { PageWrapper } from 'components/PageWrapper'
import { Heading, Box } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import { useNFT } from '@zoralabs/nft-hooks'
import { RawDisplayer } from 'components/utils'
import { NFTCard } from '@media/NFTCard'

const NFT: NextPage = () => {
  const { query } = useRouter()
  console.log(query)

  const { data } = useNFT(
    /* @ts-ignore */
    query.address,
    query.id
  )

  return (
    <PageWrapper p="x4" direction="column" gap="x4">
      <Heading>{data?.metadata?.name}</Heading>
      <Box style={{ width: '400px' }}>{data && <NFTCard nftData={data} />}</Box>
      <Heading>Last Refresh Time</Heading>
      <RawDisplayer data={data?.rawData?.APIIndexer?.lastRefreshTime} />
      <Heading>Markets</Heading>
      {data?.markets &&
        data?.markets.map((data) => (
          <RawDisplayer
            key={data.createdAt.transactionHash}
            data={{ ...data?.createdAt, status: data?.status }}
          />
        ))}

      <RawDisplayer data={data?.markets} />
    </PageWrapper>
  )
}

export default NFT

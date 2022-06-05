import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import TransactionParagraph from '../TransactionParagraph';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import ETHField from 'components/forms/fields/ETHField';
import Paragraph from 'components/base/Paragraph';
import TextLink from 'components/base/TextLink';
import Fees from '../generic/FeesTable';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionHeading from '../TransactionHeading';
import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';
import { ListFormValues } from './types';

import useGetFees from 'hooks/web3/transactions/use-get-fees';

interface ListFieldsProps {
  currentUserPublicAddress: string;
  artwork: ArtworkFragmentExtended;
  reservePrice: number;
}

export default function ListFields(props: ListFieldsProps) {
  const { artwork, currentUserPublicAddress, reservePrice } = props;

  const defaultValues = {
    tokenId: artwork?.tokenId,
    contractAddress: artwork?.contractAddress,
  };

  const { data: feesData } = useGetFees({
    ...defaultValues,
    currentUserPublicKey: currentUserPublicAddress,
    price: reservePrice,
  });

  const foundationFee = feesData?.fndFeePercent;

  return (
    <TransitionPane>
      <TransactionCard>
        <TransactionHeading>Sell with Reserve Auction</TransactionHeading>

        <TransactionParagraph css={{ marginBottom: '$6' }}>
          This price will be made public. Bidders will not be able to bid below
          this price. Once a bid has been placed, a 24 hour auction for the
          piece will begin.
        </TransactionParagraph>

        <Flex
          css={{
            marginBottom: '$5',
            '@bp1': {
              marginBottom: '$8',
            },
          }}
        >
          <ListHelpArticleLink />
        </Flex>

        <Box css={{ marginBottom: '$7' }}>
          <TransactionHeading size="small" css={{ marginBottom: '$5' }}>
            Set price
          </TransactionHeading>
          <Box css={{ marginBottom: '$6' }}>
            <ETHField placeholder="1" name="reservePrice" />
          </Box>

          <Fees.Table fees={feesData} />

          <Paragraph size="sub" css={{ color: '$black60' }}>
            A {foundationFee}% marketplace fee will be charged based on the
            final sale price of the NFT. While your NFT is listed on Foundation,
            it will be escrowed within Foundation’s smart contracts.
          </Paragraph>
        </Box>
        <TransactionSubmitButton<ListFormValues>
          label="List your NFT"
          submittingLabel="Listing NFT…"
          submittedLabel="NFT Listed"
        />
      </TransactionCard>
    </TransitionPane>
  );
}

export function ListHelpArticleLink() {
  return (
    <TextLink
      target="_blank"
      rel="noreferrer"
      href="https://help.foundation.app/hc/en-us/articles/4562018706459"
    >
      Learn more about Auctions
    </TextLink>
  );
}

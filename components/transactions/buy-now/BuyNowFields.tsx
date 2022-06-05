import { useFormikContext } from 'formik';
import { useAccount } from 'wagmi';

import Paragraph from 'components/base/Paragraph';
import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import TransactionParagraph from '../TransactionParagraph';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionHeading from '../TransactionHeading';
import ETHField from 'components/forms/fields/ETHField';
import Fees from '../generic/FeesTable';

import { LearnMoreArticleLink } from './BuyNowInfo';
import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

import useGetFees from 'hooks/web3/transactions/use-get-fees';

import { SetBuyNowPriceVariables } from 'hooks/web3/transactions/use-set-buy-now-price';
import { BuyNowMode, SetBuyNowFormValues } from './types';

interface BuyNowFieldsProps {
  buyNowMode: BuyNowMode;
}

export default function BuyNowFields(props: BuyNowFieldsProps) {
  const { buyNowMode } = props;

  const [{ data: user }] = useAccount();

  const publicAddress = user?.address;

  const { values } = useFormikContext<SetBuyNowFormValues>();

  const { data: feesData } = useGetFees({
    contractAddress: values.contractAddress,
    tokenId: values.tokenId,
    price: Number(values.buyNowPrice),
    currentUserPublicKey: publicAddress,
  });

  return (
    <TransitionPane>
      <TransactionCard>
        <TransactionHeading css={{ marginBottom: '$5' }}>
          {buyNowMode === 'set'
            ? 'Set a Buy Now price'
            : 'Change Buy Now price'}
        </TransactionHeading>
        <TransactionParagraph css={{ marginBottom: '$5' }}>
          Buyers will be able to instantly buy the NFT. You may edit this price
          at any time.
        </TransactionParagraph>
        <Flex
          css={{
            marginBottom: '$5',
            '@bp1': { marginBottom: '$8' },
          }}
        >
          <LearnMoreArticleLink />
        </Flex>

        <Box css={{ marginBottom: '$8' }}>
          <TransactionHeading size="small" css={{ marginBottom: '$5' }}>
            Buy Now Price
          </TransactionHeading>
          <Box css={{ marginBottom: buyNowMode === 'set' ? '$6' : '$7' }}>
            <ETHField placeholder="1" name="buyNowPrice" />
          </Box>

          {buyNowMode === 'set' && <Fees.Table fees={feesData} />}

          {buyNowMode === 'set' ? (
            <Paragraph size="sub" css={{ color: '$black60' }}>
              While your NFT is for sale, it will be escrowed within
              Foundation’s smart contracts, and you will not be able to transfer
              unless you remove the Buy Now price.
            </Paragraph>
          ) : (
            // TODO: get marketplace fee from contract vs. hard-coded value
            <Paragraph size="sub" css={{ color: '$black60' }}>
              While your NFT is for sale, it will be escrowed within
              Foundation’s smart contracts, and you will not be able to transfer
              unless you remove the Buy Now price.
            </Paragraph>
          )}
        </Box>
        <TransactionSubmitButton<SetBuyNowPriceVariables>
          label={buyNowMode === 'set' ? 'Set price' : 'Change price'}
          submittingLabel="Setting price…"
          submittedLabel="Price set"
        />
      </TransactionCard>
    </TransitionPane>
  );
}

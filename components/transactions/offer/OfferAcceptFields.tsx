import { useAccount } from 'wagmi';

import Flex from 'components/base/Flex';
import Grid from 'components/base/Grid';
import Fees from '../generic/FeesTable';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionHeading from '../TransactionHeading';
import { AuctionCountdownTimerInline } from 'components/artworks/auction/ArtworkAuctionCountdownV2';
import Text from 'components/base/Text';
import UserTag from 'components/users/UserTag';
import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

import { MakeOfferVariables } from 'hooks/web3/transactions/use-make-offer';
import { AcceptOfferFormValues } from './types';

import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';
import useGetFees from 'hooks/web3/transactions/use-get-fees';

import { maybeGetAddress } from 'utils/users';

interface OfferAcceptFieldsProps extends AcceptOfferFormValues {
  buyerPublicKey: string;
  expiresAt: number;
}

export default function OfferAcceptFields(props: OfferAcceptFieldsProps) {
  const { buyerPublicKey, expiresAt, tokenId, contractAddress, amount } = props;

  const { data: buyerData } = useUserByPublicKey(
    { publicKey: maybeGetAddress(buyerPublicKey) },
    { enabled: Boolean(buyerPublicKey) }
  );

  const [{ data: user }] = useAccount();

  const publicAddress = user?.address;

  const { data: feesData } = useGetFees({
    tokenId,
    contractAddress,
    price: Number(amount),
    currentUserPublicKey: publicAddress,
  });

  return (
    <TransitionPane>
      <TransactionCard>
        <TransactionHeading css={{ marginBottom: '$8' }}>
          Accept Offer
        </TransactionHeading>

        <Flex css={{ marginBottom: '$8' }}>
          <Grid css={{ gap: '$2' }}>
            <Text css={{ color: '$black60' }} weight="semibold">
              Received from
            </Text>
            <UserTag user={buyerData?.user} />
          </Grid>
          <Grid
            css={{
              gap: '$2',
              borderLeft: 'solid 1px $black10',
              paddingLeft: '$7',
              marginLeft: '$7',
            }}
          >
            <Text css={{ color: '$black60' }} weight="semibold">
              Expires in
            </Text>
            <AuctionCountdownTimerInline
              timestamp={expiresAt}
              valueKey="shortLabel"
            />
          </Grid>
        </Flex>

        <Fees.Table fees={feesData} />

        <TransactionSubmitButton<MakeOfferVariables>
          label="Accept offer"
          submittingLabel="Accepting offer…"
          submittedLabel="Offer accepted"
        />
      </TransactionCard>
    </TransitionPane>
  );
}

import Box from 'components/base/Box';
import Grid from 'components/base/Grid';
import Flex from 'components/base/Flex';
import Text from 'components/base/Text';
import Heading from 'components/base/Heading';
import GraySquare from 'components/base/GraySquare';
import CircleAvatar from 'components/avatars/CircleAvatar';
import FollowPopover from 'components/follows/FollowPopover';

import { VariantProps } from '@stitches/react';

import { buildAvatarUrl } from 'utils/assets';
import { formatETHWithSuffix } from 'utils/formatters';
import { getUsernameOrTruncatedAddress, truncateAddress } from 'utils/helpers';

import {
  ReceivedFees,
  RecipientType,
} from 'hooks/web3/transactions/use-get-fees';

import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';

interface LineItemWithReceiverProps {
  publicKey: string;
  amountInEth: number;
  percentage: number;
  label: string;
}

export function LineItemWithReceiver(props: LineItemWithReceiverProps) {
  const { percentage, amountInEth, publicKey, label } = props;

  const { data } = useUserByPublicKey(
    { publicKey },
    { refetchOnWindowFocus: false, refetchOnMount: false }
  );

  const user = data?.user;

  const avatarUrl = buildAvatarUrl(36, user?.profileImageUrl);

  return (
    <Flex css={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <FollowPopover publicKey={publicKey}>
        <Flex css={{ alignItems: 'center' }}>
          {user ? (
            <CircleAvatar
              imageUrl={avatarUrl}
              publicKey={publicKey}
              maxSize={36}
            />
          ) : (
            <GraySquare css={{ width: 36, height: 36, borderRadius: 999 }} />
          )}

          <Box css={{ marginLeft: '$4' }}>
            {user ? (
              <Heading size={1}>{getUsernameOrTruncatedAddress(user)}</Heading>
            ) : (
              <Heading>
                {truncateAddress({ address: publicKey, numberOfChars: 4 })}
              </Heading>
            )}

            <Text size={0} css={{ color: '$black60' }}>
              {label}
            </Text>
          </Box>
        </Flex>
      </FollowPopover>

      <CostPercentage
        percentSplit={percentage}
        amountInEth={amountInEth}
        size={2}
      />
    </Flex>
  );
}

interface CostPercentageProps {
  amountInEth: number;
  percentSplit: number;
  size: VariantProps<typeof Text>['size'];
}

function CostPercentage(props: CostPercentageProps) {
  const { amountInEth, percentSplit, size } = props;
  return (
    <Box css={{ textAlign: 'right' }}>
      <Heading size={size}>{formatETHWithSuffix(amountInEth)}</Heading>
      <Text size={0} css={{ color: '$black60' }}>
        {percentSplit}%
      </Text>
    </Box>
  );
}

interface LineItemProps {
  label: string;
  value: string;
  size?: VariantProps<typeof Text>['size'];
}

function LineItem(props: LineItemProps) {
  const { label, value, size = 2 } = props;

  return (
    <Flex css={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <Heading size={1} css={{ color: '$black60' }}>
        {label}
      </Heading>
      <Text size={size} weight="semibold">
        {value}
      </Text>
    </Flex>
  );
}

interface LineItemWithPercentageProps {
  label: string;
  amountInEth: number;
  percentage: number;
  size?: VariantProps<typeof Text>['size'];
}

function LineItemWithPercentage(props: LineItemWithPercentageProps) {
  const { label, amountInEth, percentage, size = 2 } = props;

  return (
    <Flex css={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <Heading size={1} css={{ color: '$black60' }}>
        {label}
      </Heading>
      <CostPercentage
        percentSplit={percentage}
        amountInEth={amountInEth}
        size={size}
      />
    </Flex>
  );
}

interface OfferFeesTableProps {
  fees: ReceivedFees;
}

function Table(props: OfferFeesTableProps) {
  const { fees } = props;

  if (!fees) {
    return null;
  }

  return (
    <Box>
      <Grid css={{ gap: '$7', paddingBottom: '$4' }}>
        {fees.recipients.map((fee, key) =>
          fee.recipientType === 'FOUNDATION' ? (
            <LineItemWithPercentage
              key={key}
              label={getFeeLabel(fee.recipientType)}
              amountInEth={fee.amountInEth}
              percentage={fee.percent}
            />
          ) : (
            <LineItemWithReceiver
              key={key}
              label={getFeeLabel(fee.recipientType)}
              amountInEth={fee.amountInEth}
              percentage={fee.percent}
              publicKey={fee.recipient}
            />
          )
        )}
      </Grid>
      {fees.currentUserFee && (
        <Flex
          css={{
            paddingTop: '$4',
            paddingBottom: '$7',
            borderTop: 'solid 1px $black10',
            justifyContent: 'space-between',
          }}
        >
          <Heading size={1}>You’ll receive</Heading>
          <Box css={{ textAlign: 'right' }}>
            <Heading size={3}>
              {formatETHWithSuffix(fees.currentUserFee.amountInEth)}
            </Heading>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

const getFeeLabel = (recipientType: RecipientType) => {
  if (recipientType === 'FOUNDATION') {
    return 'Marketplace fee';
  }
  if (recipientType === 'CREATOR') {
    return 'Creator';
  }
  if (recipientType === 'SPLIT_RECIPIENT') {
    return 'Split';
  }
  if (recipientType === 'OWNER') {
    return 'Owner';
  }
  return 'Recipient';
};

const Fees = {
  Table,
  CostPercentage,
  LineItem,
  LineItemWithReceiver,
  LineItemWithPercentage,
};

export default Fees;

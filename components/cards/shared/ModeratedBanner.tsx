import { always, cond, equals } from 'ramda';

import Flex from 'components/base/Flex';
import Icon from 'components/Icon';
import Text from 'components/base/Text';

import UnderReviewIcon from 'assets/icons/under-review-icon.svg';
import DmcaIcon from 'assets/icons/dmca-icon.svg';
import SuspendedIcon from 'assets/icons/suspended-icon.svg';

import { ModerationStatus } from 'types/Moderation';

interface ModeratedBannerProps {
  status: string;
}

const statusFormatter = cond([
  [
    equals(ModerationStatus.UnderReview),
    always({ label: 'Under Review', icon: UnderReviewIcon }),
  ],
  [
    equals(ModerationStatus.TakedownRequested),
    always({ label: 'Takedown Requested', icon: DmcaIcon }),
  ],
  [
    equals(ModerationStatus.Suspended),
    always({ label: 'Suspended', icon: SuspendedIcon }),
  ],
]);

export default function ModeratedBanner(props: ModeratedBannerProps) {
  const { status } = props;

  const statusObj = statusFormatter(status);

  return (
    <Flex
      css={{
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 10,
        height: 36,
        backgroundColor: '$blackT60',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <Icon icon={statusObj.icon} width={18} height={16} />
      <Text
        size={0}
        weight="semibold"
        css={{ color: '$white100', marginLeft: '$2' }}
      >
        {statusObj.label}
      </Text>
    </Flex>
  );
}

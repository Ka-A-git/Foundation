import { cond, equals, always, T } from 'ramda';

import { ModerationStatus } from 'types/Moderation';

import DMCANotice from './DMCANotice';
import Artwork from 'types/Artwork';
import WarningBlock from './WarningBlock';
import WarningTermsLink from './WarningTermsLink';

interface ArtworkWarningBlockProps {
  artwork: Pick<Artwork, 'moderationStatus' | 'moderationFrom'>;
}

export default function ArtworkWarningBlock(props: ArtworkWarningBlockProps) {
  const { artwork } = props;

  return cond<ModerationStatus, JSX.Element>([
    [
      (status) => equals(ModerationStatus.Suspended, status),
      always(<ArtworkSuspended />),
    ],
    [
      (status) => equals(ModerationStatus.UnderReview, status),
      always(<ArtworkUnderReview />),
    ],
    [
      (status) => equals(ModerationStatus.TakedownRequested, status),
      () => (
        <DMCANotice
          moderationFrom={artwork.moderationFrom}
          title="This NFT has received a DMCA takedown notice."
        />
      ),
    ],
    [T, () => null],
  ])(artwork.moderationStatus);
}

export function ArtworkUnderReview(): JSX.Element {
  return (
    <WarningBlock
      title="This NFT is under review"
      description={
        <>
          This NFT is currently under review by the Foundation team to ensure it
          has not violated the Foundation <WarningTermsLink />.
        </>
      }
      icon={ModerationStatus.UnderReview}
    />
  );
}

export function ArtworkSuspended(): JSX.Element {
  return (
    <WarningBlock
      title="This NFT has been permanently removed."
      description={
        <>
          This NFT was found to be in violation of the Foundation{' '}
          <WarningTermsLink /> and has been permanently removed.
        </>
      }
      icon={ModerationStatus.Suspended}
    />
  );
}

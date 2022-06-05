import { CSS } from 'stitches.config';
import { UseMutationResult } from 'react-query';

import PopoverMeatball from 'components/popover/PopoverMeatball';
import PopoverMenu from 'components/popover/PopoverMenu';
import SpinnerStroked from 'components/SpinnerStroked';
import Icon from 'components/Icon';
import Box from 'components/base/Box';
import { PopoverMenuOption } from 'components/popover/types';

import UnhideIcon from 'assets/icons/eye-icon-bold.svg';
import HideIcon from 'assets/icons/hide-icon.svg';
import TagIcon from 'assets/icons/tags-icon.svg';

import { ArtworkV2 } from 'types/Artwork';
import { PopoverVariants } from 'components/popover/PopoverButton';

import {
  SetArtworkUserVisibility,
  SetArtworkUserVisibilityVariables,
} from 'graphql/server/mutations/set-artwork-user-visibility.generated';

import { isAllTrue, notEmptyOrNil } from 'utils/helpers';
import { areKeysEqual } from 'utils/users';
import { Authorization, buildArtworkTagsPath } from 'utils/artwork/artwork';

interface ArtworkPagePopoverProps {
  authorization: Authorization;
  artwork: ArtworkV2;
  currentUserPublicKey: string;
  setIsHovered: (arg0: boolean) => void;
  options?: PopoverMenuOption[];
  css?: CSS;
  appearance?: PopoverVariants['appearance'];
  size?: PopoverVariants['size'];
  setArtworkUserVisibility?: UseMutationResult<
    SetArtworkUserVisibility,
    Error,
    SetArtworkUserVisibilityVariables
  >;
}

export default function ArtworkPagePopover(
  props: ArtworkPagePopoverProps
): JSX.Element {
  const {
    authorization,
    artwork,
    currentUserPublicKey,
    setArtworkUserVisibility,
    options = [],
    css,
    appearance,
    size,
    setIsHovered,
  } = props;

  const hasSplits = artwork?.splitRecipients?.aggregate?.count > 0;

  const hasTags = artwork?.tags.length !== 0;

  const isCreator = areKeysEqual([artwork?.publicKey, currentUserPublicKey]);

  const isHidden = notEmptyOrNil(artwork?.artworkUserVisibilities);

  const isLoading = setArtworkUserVisibility?.isLoading;
  const mutate = setArtworkUserVisibility?.mutate;

  const unhideArtworkLabel = isLoading ? 'Hiding NFT' : 'Hide NFT';
  const hideArtworkLabel = isLoading ? 'Unhiding NFT' : 'Unhide NFT';
  const tagLabel = !hasTags ? 'Add tags' : 'Edit tags';

  authorization.canHide = isAllTrue([
    setArtworkUserVisibility,
    (hasSplits && !isCreator) || !isCreator,
  ]);

  const fullOptions: PopoverMenuOption[] = [
    {
      enabled: authorization.canTag,
      icon: <Icon icon={TagIcon} width={18} height={18} />,
      children: tagLabel,
      href: `${buildArtworkTagsPath(artwork)}?redirect=profile`,
    },
    {
      enabled: authorization.canHide,
      icon: isLoading ? (
        <SpinnerStroked size={20} />
      ) : isHidden ? (
        <Icon icon={UnhideIcon} width={22} height={16} />
      ) : (
        <Icon icon={HideIcon} width={22} height={22} />
      ),
      children: isHidden ? hideArtworkLabel : unhideArtworkLabel,
      onClick: () => {
        mutate({
          tokenId: artwork?.tokenId,
          contractAddress: artwork?.contractAddress,
          shouldHide: !isHidden,
        });
      },
    },
    ...options,
  ];

  const enabledOptions = fullOptions.filter((option) => option.enabled);
  const hasOptions = notEmptyOrNil(enabledOptions);

  if (hasOptions) {
    return (
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        css={{ position: 'relative', zIndex: 4 }}
      >
        <PopoverMeatball size={size} appearance={appearance} css={css}>
          <PopoverMenu options={enabledOptions} />
        </PopoverMeatball>
      </Box>
    );
  }
  return null;
}

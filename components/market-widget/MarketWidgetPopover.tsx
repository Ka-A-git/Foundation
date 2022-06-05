import PopoverMeatball from 'components/popover/PopoverMeatball';
import PopoverMenu from 'components/popover/PopoverMenu';
import Icon from 'components/Icon';
import Box from 'components/base/Box';
import { PopoverMenuOption } from 'components/popover/types';

import UnlistIcon from 'assets/icons/unlist-icon.svg';

import { ArtworkV2 } from 'types/Artwork';

import { notEmptyOrNil } from 'utils/helpers';
import {
  Authorization,
  buildArtworkBuyNowPath,
  buildArtworkPath,
} from 'utils/artwork/artwork';

interface MarketWidgetPopoverProps {
  artwork: ArtworkV2;
  type: 'auction' | 'buy-now';
  authorization: Authorization;
}

export default function MarketWidgetPopover(
  props: MarketWidgetPopoverProps
): JSX.Element {
  const { artwork, type, authorization } = props;

  if (!artwork || !type || !authorization) {
    return null;
  }

  const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });

  const options: PopoverMenuOption[] = [
    {
      enabled: type === 'buy-now' && authorization.canChangeBuyNowPrice,
      icon: <Icon icon={UnlistIcon} width={18} height={18} />,
      children: 'Remove',
      href: buildArtworkBuyNowPath(artwork, 'REMOVE'),
    },
    {
      enabled: type === 'auction' && authorization.canChangeReservePrice,
      icon: <Icon icon={UnlistIcon} width={18} height={18} />,
      children: 'Unlist',
      href: `${artworkPath}/unlist`,
    },
  ];

  const enabledOptions = options.filter((option) => option.enabled);
  const hasOptions = notEmptyOrNil(enabledOptions);

  if (hasOptions) {
    return (
      <Box css={{ zIndex: 4, right: '$6', top: '$6', position: 'absolute' }}>
        <PopoverMeatball size="small" appearance="minimal">
          <PopoverMenu options={enabledOptions} />
        </PopoverMeatball>
      </Box>
    );
  }
  return null;
}

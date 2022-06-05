import Text from 'components/base/Text';
import Box from 'components/base/Box';
import Popover from 'components/popover/Popover';
import Icon from 'components/Icon';
import PopoverMenu from 'components/popover/PopoverMenu';

import TransferIcon from 'assets/icons/transfer-icon.svg';
import BurnIcon from 'assets/icons/burn-icon.svg';
import Chevron from 'assets/icons/rounded-chevron.svg';
import { PopoverMenuOption } from 'components/popover/types';

import { ArtworkV2 } from 'types/Artwork';

import { Authorization, buildCreatorArtworkPath } from 'utils/artwork/artwork';
import { notEmptyOrNil } from 'utils/helpers';

interface ManageMenuProps {
  authorization: Authorization;
  artwork: ArtworkV2;
  artworkPath: string;
}

export default function ManageMenu(props: ManageMenuProps) {
  const { authorization, artwork, artworkPath } = props;

  const creatorArtworkPath = buildCreatorArtworkPath(artwork);

  const fullOptions: PopoverMenuOption[] = [
    {
      enabled: authorization.canTransfer,
      icon: <Icon icon={TransferIcon} width={18} height={18} />,
      children: 'Transfer NFT',
      href: `${artworkPath}/transfer`,
    },
    {
      enabled: authorization.canBurn,
      icon: <Icon icon={BurnIcon} width={18} height={18} />,
      children: <Text css={{ color: '#F93A3A' }}>Burn NFT</Text>,
      href: `${creatorArtworkPath}/burn`,
    },
  ];

  const enabledOptions = fullOptions.filter((option) => option.enabled);
  const hasOptions = notEmptyOrNil(enabledOptions);

  if (hasOptions) {
    return (
      <Popover
        placement="top"
        button={
          <Box
            css={{
              position: 'relative',
              zIndex: 4,
              color: '$black100',
              borderRadius: '$round',
              paddingY: '$2',
              paddingX: '$4',
              background: '$white100',
              boxShadow: '$0',
              cursor: 'pointer',
            }}
          >
            <Text
              css={{ display: 'inline-block', paddingRight: '$2' }}
              weight="semibold"
              size={1}
            >
              Manage
            </Text>
            <Chevron
              style={{
                marginLeft: 'auto',
                minWidth: 20,
                transform: 'rotate(180deg)',
                marginBottom: 2,
              }}
            />
          </Box>
        }
      >
        <PopoverMenu options={enabledOptions} />
      </Popover>
    );
  }
  return null;
}

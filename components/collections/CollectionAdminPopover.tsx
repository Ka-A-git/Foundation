import PopoverMeatball from 'components/popover/PopoverMeatball';
import PopoverMenu from 'components/popover/PopoverMenu';

import NotAllowedIcon from 'assets/icons/not-allowed.svg';
import AdminShield from 'assets/icons/admin-shield.svg';
import SelfDestructIcon from 'assets/icons/self-destruct-icon.svg';

import useModal from 'hooks/use-modal';

import { ModalKey } from 'types/modal';
import { CSS } from 'stitches.config';

import Icon from 'components/Icon';
import { isAllTrue } from 'utils/helpers';

interface CollectionAdminPopoverProps {
  currentUserIsAdmin: boolean;
  isOwner: boolean;
  collectionPath: string;
  canBurnCollection: boolean;
  css?: CSS;
}

export default function CollectionAdminPopover(
  props: CollectionAdminPopoverProps
) {
  const {
    currentUserIsAdmin,
    isOwner,
    canBurnCollection,
    collectionPath,
    css,
  } = props;

  const { setCurrentModal } = useModal();

  const canBurn = isAllTrue([isOwner, canBurnCollection]);

  return (
    <PopoverMeatball css={css}>
      <PopoverMenu
        options={[
          {
            enabled: currentUserIsAdmin,
            icon: <AdminShield />,
            children: 'Admin Tools',
            onClick: () => {
              return setCurrentModal(ModalKey.ADMIN_TOOLS);
            },
          },
          {
            enabled: true,
            icon: <NotAllowedIcon />,
            children: <span style={{ color: '#F93A3A' }}>Report</span>,
            onClick: () => {
              return setCurrentModal(ModalKey.REPORT);
            },
          },
          {
            enabled: canBurn,
            icon: <Icon icon={SelfDestructIcon} width={22} height={22} />,
            children: <span style={{ color: '#F93A3A' }}>Self-destruct</span>,
            href: `${collectionPath}/self-destruct`,
          },
        ].filter((option) => option.enabled)}
      />
    </PopoverMeatball>
  );
}

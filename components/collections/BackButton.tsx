import { styled, CSS } from 'stitches.config';

import Box from 'components/base/Box';
import Icon from 'components/Icon';

import LeftArrowIcon from 'assets/icons/left-arrow-icon.svg';

interface BackButtonProps {
  onClick: () => void;
  css?: CSS;
}

const BackButtonWrapper = styled('button', {
  display: 'flex',
  border: '2px solid $black10',
  width: 52,
  height: 52,
  borderRadius: '$round',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  transition: 'border-color $1 $ease',
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  '@hover': {
    '&:hover': {
      borderColor: '$black100',
    },
  },
});

export default function BackButton(props: BackButtonProps): JSX.Element {
  const { onClick, css } = props;
  return (
    <BackButtonWrapper onClick={onClick} css={css} type="button">
      <Box css={{ margin: 'auto' }}>
        <Icon icon={LeftArrowIcon} width={20} height={16} />
      </Box>
    </BackButtonWrapper>
  );
}

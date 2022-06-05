import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { styled } from 'stitches.config';

import Flex from 'components/base/Flex';
import ButtonV2 from 'components/base/ButtonV2';
import CloseIcon from 'assets/icons/close-icon.svg';
import { H3Heading } from 'components/base/Heading';

type ModalHeaderProps = {
  title?: string;
  primaryCta?: React.ReactElement;
  secondaryCta?: React.ReactElement;
};

export default function ModalHeader(props: ModalHeaderProps): JSX.Element {
  const { primaryCta, secondaryCta, title } = props;
  return (
    <Container>
      <Stack>
        <CloseButton>
          <CloseIcon />
        </CloseButton>
        <H3Heading weight="semibold" size={2}>
          {title}
        </H3Heading>
      </Stack>
      <Stack>
        {secondaryCta}
        {primaryCta}
      </Stack>
    </Container>
  );
}

const CloseButton = styled(Dialog.Trigger, ButtonV2, {
  defaultVariants: {
    size: 0,
    icon: 'standalone',
    variant: 'outline',
  },
});

const Container = styled(Flex, {
  justifyContent: 'space-between',
  boxShadow: '0px 0px 0px 1px $colors$blackT5',
  padding: '$4',
  '@bp2': {
    padding: '$6',
  },
});

const Stack = styled(Flex, {
  alignItems: 'center',
  gap: '$2',
});

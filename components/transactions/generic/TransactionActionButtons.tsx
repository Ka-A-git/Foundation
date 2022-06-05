import { CSS, styled } from 'stitches.config';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import { identity } from 'ramda';

import Grid from 'components/base/Grid';
import Box from 'components/base/Box';
import Button, { ButtonVariants } from 'components/base/Button';

export type ActionButton = ButtonVariants & {
  label: string;
  href: string;
  variants?: ButtonVariants;
  css?: CSS;
};

interface TransactionActionButtonsProps {
  buttons: [ActionButton, ActionButton?];
}

export default function TransactionActionButtons(
  props: TransactionActionButtonsProps
) {
  const { buttons } = props;

  const [primaryButton, secondaryButton] = buttons;

  return (
    <ButtonGrid>
      <TransactionActionButton
        href={primaryButton.href}
        variants={primaryButton.variants}
        label={primaryButton.label}
      />
      {secondaryButton && (
        <TransactionActionButton
          href={secondaryButton.href}
          label={secondaryButton.label}
          variants={{ color: 'white', ...secondaryButton.variants }}
        />
      )}
    </ButtonGrid>
  );
}

interface TransactionActionButtonsExternalProps {
  buttons: [ReactNode, ActionButton];
  isReversed?: boolean;
}

export function TransactionActionButtonsExternal(
  props: TransactionActionButtonsExternalProps
) {
  const { buttons, isReversed = false } = props;

  const [primaryButton, secondaryButton] = buttons;

  const components = [
    primaryButton,
    <TransactionActionButton
      key="btn"
      href={secondaryButton.href}
      label={secondaryButton.label}
      variants={{ color: 'white', ...secondaryButton.variants }}
    />,
  ];

  return (
    <ButtonGrid>
      {isReversed
        ? components.reverse().map(identity)
        : components.map(identity)}
    </ButtonGrid>
  );
}

export function TransactionActionButton(props: ActionButton) {
  const { href, variants, label, css } = props;
  return (
    <Box>
      <NextLink href={href} passHref>
        <Button
          as="a"
          hoverable
          size="medium"
          shape="regular"
          color="black"
          css={{ width: '100%', whiteSpace: 'nowrap', ...css }}
          {...variants}
        >
          {label}
        </Button>
      </NextLink>
    </Box>
  );
}

export const ButtonGrid = styled(Grid, {
  gridTemplateColumns: '1fr 1fr',
  gap: '$4',
  width: '100%',
});

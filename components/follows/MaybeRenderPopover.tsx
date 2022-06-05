import { CSS } from 'stitches.config';
import { ReactNode } from 'react';
import FollowPopover from 'components/follows/FollowPopover';

interface MaybeRenderPopoverProps {
  disablePopover: boolean;
  publicKey: string;
  children: ReactNode;
  css?: CSS;
}

export default function MaybeRenderPopover(props: MaybeRenderPopoverProps) {
  const { disablePopover, publicKey, children, css } = props;

  // popover is enabled, so wrap the child component
  if (!disablePopover) {
    return (
      <FollowPopover publicKey={publicKey} css={css}>
        {children}
      </FollowPopover>
    );
  }

  // otherwise return just the child component
  return <>{children}</>;
}

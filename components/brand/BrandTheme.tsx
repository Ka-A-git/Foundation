import { ReactNode } from 'react';
import { CSS, styled } from 'stitches.config';
import brandTheme from 'utils/themes/brand/theme';
import Box from 'components/base/Box';

interface BrandThemeProps {
  css?: CSS;
  children: ReactNode;
}

const BrandContainer = styled(Box, {});

export default function BrandTheme(props: BrandThemeProps): JSX.Element {
  const { css, children } = props;
  return (
    <BrandContainer css={css} className={brandTheme}>
      {children}
    </BrandContainer>
  );
}

import { styled } from 'stitches.config';

import Flex from 'components/base/Flex';
import Box from 'components/base/Box';
import Image from 'components/base/Image';

type SplitSectionProps = {
  children: React.ReactNode;
  illustration?: {
    alt: string;
    src: string;
    src2x: string;
  }; // Temporary
};

// WIP
export default function SplitSection(props: SplitSectionProps): JSX.Element {
  const { children, illustration } = props;
  return (
    <Container>
      <Column>{children}</Column>
      <ImageColumn>
        {illustration && (
          <ImageBlock>
            <Image
              alt={illustration.alt}
              src={illustration.src}
              srcSet={`${illustration.src2x} 2x`}
            />
          </ImageBlock>
        )}
      </ImageColumn>
    </Container>
  );
}

const Container = styled(Flex, {
  gap: '0',
  marginY: '$10',
  flexDirection: 'column',
  '@bp2': {
    gap: '$9',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const Column = styled(Box, {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  '@bp2': {
    width: '50%',
    justifyContent: 'flex-start',
  },
});

const ImageColumn = styled(Box, {
  width: '100%',
  '@bp2': {
    width: '50%',
  },
});

const ImageBlock = styled(Box, {
  '> img': {
    display: 'block',
  },
  '@bp2': {
    position: 'relative',
    aspectRatio: '3 / 4',
    '> img': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      maxWidth: '100%',
      display: 'block',
      transform: 'translate(-50%, -50%)',
    },
    '@supports not (aspect-ratio: 3 / 4)': {
      '&::before': {
        float: 'left',
        paddingTop: '133%',
        content: '""',
      },
      '&::after': {
        display: 'block',
        content: '',
        clear: 'both',
      },
    },
  },
});

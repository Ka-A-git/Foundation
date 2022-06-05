import { useCallback } from 'react';
import NextLink from 'next/link';

import { styled } from 'stitches.config';
import { onGridPx } from 'utils/styles';

import Flex from 'components/base/Flex';
import Text from 'components/base/Text';
import ButtonV2 from 'components/base/ButtonV2';

import useSegmentEvent from 'hooks/analytics/use-segment-event';

export default function CreatorsBlock() {
  const [sendSegmentEvent] = useSegmentEvent();

  const handleSegmentEvent = useCallback(() => {
    sendSegmentEvent({
      eventName: 'homepage_primary_cta_clicked',
      payload: {},
    });
  }, [sendSegmentEvent]);

  return (
    <Container>
      <Paragraph size={{ '@initial': 3, '@bp2': 4 }} weight="regular">
        Join the millions of creators, collectors, and curators who are on this
        web3 journey with you.
      </Paragraph>
      <NextLink href="/feed">
        <ButtonV2
          as="a"
          onClick={() => handleSegmentEvent()}
          size={2}
          variant="primary"
        >
          Get started
        </ButtonV2>
      </NextLink>
    </Container>
  );
}

const Container = styled(Flex, {
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',

  width: '100%',
  maxWidth: '$container',

  paddingX: '$6',
  marginX: 'auto',

  marginTop: onGridPx(30),
  marginBottom: onGridPx(20),

  '@bp2': {
    marginTop: onGridPx(80),
    marginBottom: onGridPx(30),
  },
});

const Paragraph = styled('p', Text, {
  color: '$black100',
  lineHeight: '$mid',
  marginBottom: '$7',
  maxWidth: onGridPx(90),

  '@bp2': {
    maxWidth: onGridPx(200),
  },
});

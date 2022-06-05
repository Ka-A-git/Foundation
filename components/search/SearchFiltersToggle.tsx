import { motion } from 'framer-motion';

import Box from 'components/base/Box';
import Button from 'components/base/Button';

import { CSS, styled } from 'stitches.config';

interface SearchFiltersToggleProps {
  openSearch: () => void;
  css?: CSS;
}

export default function SearchFiltersToggle(
  props: SearchFiltersToggleProps
): JSX.Element {
  const { openSearch, css } = props;
  return (
    <Box
      css={{
        position: 'fixed',
        bottom: '$6',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        ...css,
      }}
    >
      <ArtworkFiltersOpenButton
        color="black"
        as={motion.div}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.1 }}
        onClick={openSearch}
      >
        Filters
      </ArtworkFiltersOpenButton>
    </Box>
  );
}

const ArtworkFiltersOpenButton = styled(Button, {
  paddingX: '$8',
  borderRadius: 999,
  fontSize: '$2',
  boxShadow: '$3',
  minWidth: 120,
  minHeight: 60,
});

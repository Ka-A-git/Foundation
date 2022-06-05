import NextLink from 'next/link';
import ButtonV2, { ButtonV2Variants } from 'components/base/ButtonV2';

export type CtaButtonProps = {
  href: string;
  text: string;
  size?: ButtonV2Variants['size'];
  onClick?: () => void;
};

export default function CtaButton(props: CtaButtonProps) {
  const { href, text, size = 2, onClick } = props;

  return (
    <NextLink href={href} passHref>
      <ButtonV2
        as="a"
        css={{ whiteSpace: 'nowrap' }}
        size={size}
        variant="primary"
        onClick={onClick}
      >
        {text}
      </ButtonV2>
    </NextLink>
  );
}

import TextLink from 'components/base/TextLink';
import { CSS } from 'stitches.config';

interface LearnMoreArticleLinkProps {
  css?: CSS;
}

export function LearnMoreArticleLink(props: LearnMoreArticleLinkProps) {
  const { css } = props;
  return (
    <TextLink
      target="_blank"
      rel="noreferrer"
      href="https://help.foundation.app/hc/en-us/articles/4562018706459"
      css={css}
    >
      Learn about Buy Now
    </TextLink>
  );
}

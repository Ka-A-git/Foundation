import { ReactNode } from 'react';
import { H1Heading } from 'components/base/Heading';

interface FormHeadingProps {
  children: ReactNode;
}

export default function FormHeading(props: FormHeadingProps): JSX.Element {
  const { children } = props;
  return (
    <H1Heading
      size={{ '@initial': 3, '@bp0': 5, '@bp1': 6 }}
      css={{
        textAlign: 'center',
        marginX: 'auto',
        '@bp0': {
          paddingTop: '$7',
        },
        '@bp1': { paddingTop: '$9' },
        '@bp2': { paddingTop: '$10' },
      }}
    >
      {children}
    </H1Heading>
  );
}

import NextLink from 'next/link';

import { formFieldsData } from 'components/report/data';
import { RadioButton, RadioGroup } from 'components/report/RadioButton';
import Text from 'components/base/Text';
import ModalHeading from 'components/modals/common/ModalHeading';
import Paragraph from 'components/base/Paragraph';
import TextLink from 'components/base/TextLink';
import Button from 'components/base/Button';

import { ReportReason } from 'types/Report';

interface ReportReasonProps {
  onChange: (arg: ReportReason) => void;
  onContinue: () => void;
  reason: ReportReason;
}

export default function ReportReasons(props: ReportReasonProps) {
  const { onChange, onContinue, reason } = props;

  return (
    <>
      <ModalHeading css={{ textAlign: 'left', marginX: 0, marginBottom: '$4' }}>
        Report an Issue
      </ModalHeading>
      <Paragraph css={{ paddingRight: '$8', marginBottom: '$6' }}>
        If you believe there's been a violation of Foundation's{' '}
        <TextLink href="/terms" css={{ display: 'inline' }}>
          Terms of Service
        </TextLink>{' '}
        or{' '}
        <NextLink href="/community-guidelines" passHref>
          <TextLink css={{ display: 'inline' }}>Community Guidelines</TextLink>
        </NextLink>
        , please complete this report.
      </Paragraph>

      <Text weight="semibold" css={{ marginBottom: '$3' }}>
        Reason
      </Text>

      <RadioGroup value={reason}>
        {formFieldsData.map((d) => (
          <RadioButton
            key={d.type}
            label={d.title}
            value={d.type}
            onChange={onChange}
          />
        ))}
      </RadioGroup>

      <Button
        hoverable
        color="black"
        shape="regular"
        size="large"
        css={{ marginTop: '$4' }}
        onClick={onContinue}
      >
        Continue
      </Button>
    </>
  );
}

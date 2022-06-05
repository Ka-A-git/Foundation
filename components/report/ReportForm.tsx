import { Formik, Form } from 'formik';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useMutation } from 'react-query';
import { useLocation } from 'react-use';

import Box from 'components/base/Box';
import SpinnerStroked from 'components/SpinnerStroked';
import Icon from 'components/Icon';
import TextAreaField from 'components/forms/fields/TextAreaField';
import TextField from 'components/forms/fields/TextField';
import Button from 'components/base/Button';
import Heading from 'components/base/Heading';

import { ReportFormSchema } from 'schemas/admin';
import { sendReport } from 'queries/admin/admin';

import LeftArrowIcon from 'assets/icons/left-arrow-icon.svg';

import { formFieldsData } from './data';
import { isAnyTrue } from 'utils/helpers';

import { PageType, ReportReason } from 'types/Report';

interface ReportFormProps {
  email: string;
  publicKey: string;
  reportedPublicKey: string;
  onSubmit: () => void;
  onBack: () => void;
  onClose: () => void;
  reason: ReportReason;
  pageType: PageType;
}

export default function ReportForm(props: ReportFormProps) {
  const {
    email,
    publicKey,
    onSubmit,
    onBack,
    onClose,
    reason,
    pageType,
    reportedPublicKey,
  } = props;
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { href } = useLocation();

  const selectedReason = formFieldsData.find((d) => d.type === reason);

  const {
    mutateAsync: sendReportMutation,
    isLoading: sendReportLoading,
    isSuccess: sendReportSuccess,
  } = useMutation(sendReport, {
    onSettled: () => {
      onSubmit();
    },
  });

  const handleOnSubmit = async (props: {
    email: string;
    issue: string;
    url: string;
    originalUrl: string;
  }) => {
    try {
      const recaptchaToken = await executeRecaptcha('report_form');
      await sendReportMutation({
        ...props,
        issueReason: reason,
        reporterPublicKey: publicKey,
        pageType,
        recaptchaToken,
        reportedPublicKey,
      });
    } catch (error) {
      // console.log(error);
    }
  };

  const isNonFormLayout = isAnyTrue([reason === ReportReason.IP]);

  if (isNonFormLayout) {
    return (
      <Box>
        <Button
          type="button"
          css={{
            borderRadius: '$round',
            height: 40,
            width: 40,
            backgroundColor: '$white100',
            border: '2px solid $black10',
            transition: 'border-color $1 $ease',
            marginBottom: '$4',
            '@hover': {
              '&:hover': {
                borderColor: '$black100',
              },
            },
          }}
          onClick={onBack}
        >
          <Icon icon={LeftArrowIcon} width={16} height={16} />
        </Button>

        <Heading size={3} css={{ marginBottom: '$4' }}>
          {selectedReason.title}
        </Heading>
        <selectedReason.description />

        <Button
          size="large"
          color="white"
          shape="regular"
          css={{ marginTop: '$8', width: '100%' }}
          onClick={onClose}
        >
          Done
        </Button>
      </Box>
    );
  }

  return (
    <Formik
      initialValues={{
        email: email,
        url: href ?? '',
        originalUrl: '',
        issue: '',
      }}
      enableReinitialize
      validationSchema={ReportFormSchema}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <Button
          type="button"
          css={{
            borderRadius: '$round',
            height: 40,
            width: 40,
            backgroundColor: '$white100',
            border: '2px solid $black10',
            transition: 'border-color $1 $ease',
            marginBottom: '$4',
            '@hover': {
              '&:hover': {
                borderColor: '$black100',
              },
            },
          }}
          onClick={onBack}
        >
          <Icon icon={LeftArrowIcon} width={16} height={16} />
        </Button>
        <Heading size={3} css={{ marginBottom: '$4' }}>
          {selectedReason.title}
        </Heading>
        <selectedReason.description />
        <Box css={{ marginBottom: '$5', marginTop: '$6' }}>
          <TextField name="email" placeholder="Email" label="Email" />
        </Box>

        <Box css={{ marginBottom: '$5' }}>
          <TextField
            name="url"
            placeholder="https://foundation.app/..."
            label="URL to report"
          />
        </Box>

        {selectedReason.originalArtworkField && (
          <Box css={{ marginBottom: '$5' }}>
            <TextField
              name="originalUrl"
              placeholder="https://..."
              label={selectedReason.originalFieldLabel}
            />
          </Box>
        )}

        <Box css={{ marginBottom: '$5' }}>
          <TextAreaField
            name="issue"
            placeholder="Describe why this page should is being reported."
            label="Issue"
            rows={6}
          />
        </Box>

        <Button
          type="submit"
          size="large"
          color="black"
          shape="regular"
          css={{ width: '100%' }}
          disabled={sendReportLoading || sendReportSuccess}
        >
          <Box
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {(sendReportLoading || sendReportSuccess) && (
              <Box css={{ position: 'absolute', left: -26 }}>
                <SpinnerStroked size={18} />
              </Box>
            )}{' '}
            Submit Report
          </Box>
        </Button>
      </Form>
    </Formik>
  );
}

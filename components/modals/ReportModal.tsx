import { always, cond, T } from 'ramda';
import { useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { ModalKey } from 'types/modal';

import Paragraph from 'components/base/Paragraph';
import Button from 'components/base/Button';
import ReportForm from 'components/report/ReportForm';
import ReportReasons from 'components/report/ReportReasons';

import ModalContainer from './common/ModalContainer';
import ModalContent from './common/ModalContent';
import ModalHeading from './common/ModalHeading';

import { useUserWithEmailByPublicKey } from 'hooks/queries/hasura/users/use-user-by-public-key';
import useModal from 'hooks/use-modal';

import { isAllTrue } from 'utils/helpers';

import { PageType, ReportReason } from 'types/Report';

interface ReportModalProps {
  publicKey: string;
  reportedPublicKey: string;
  pageType: PageType;
}

interface ReportFormContainerProps {
  email?: string;
  publicKey?: string;
  reportedPublicKey: string;
  pageType: PageType;
  onClose: () => void;
}

interface SubmittedProps {
  onClose: () => void;
}

function Submitted(props: SubmittedProps) {
  const { onClose } = props;
  return (
    <>
      <ModalHeading css={{ textAlign: 'left', marginX: 0, marginBottom: '$4' }}>
        Report Submitted
      </ModalHeading>
      <Paragraph css={{ paddingRight: '$8', marginBottom: '$6' }}>
        Thank you for submitting a report. Foundation's Trust and Safety team
        will review the report, and reach out to you if they need additional
        information.
      </Paragraph>
      <Button size="large" color="black" shape="regular" onClick={onClose}>
        Close
      </Button>
    </>
  );
}

function ReportFormContainer(props: ReportFormContainerProps) {
  const {
    email = '',
    publicKey = '',
    reportedPublicKey = '',
    pageType,
    onClose,
  } = props;
  const [step, setStep] = useState(0);
  const [reportReason, setReason] = useState<ReportReason>(null);

  const handleOnChange = (value: ReportReason) => {
    setReason(value);
  };

  const handleContinue = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(0);
  };

  return cond([
    [() => step === 2, always(<Submitted onClose={onClose} />)],
    [
      () => step === 1,
      always(
        <ReportForm
          email={email}
          publicKey={publicKey}
          onSubmit={handleSubmit}
          onBack={handleBack}
          onClose={onClose}
          reason={reportReason}
          pageType={pageType}
          reportedPublicKey={reportedPublicKey}
        />
      ),
    ],
    [
      T,
      always(
        <ReportReasons
          onChange={handleOnChange}
          onContinue={handleContinue}
          reason={reportReason}
        />
      ),
    ],
  ])();
}

export default function ReportModal(props: ReportModalProps): JSX.Element {
  const { publicKey, reportedPublicKey, pageType } = props;

  const { currentModal, resetModal } = useModal();

  const isOpen = ModalKey.REPORT === currentModal;

  const { data: currentUserAuthData } = useUserWithEmailByPublicKey(
    { publicKey: publicKey },
    { enabled: isAllTrue([isOpen]) }
  );

  const handleClose = () => {
    resetModal();
  };

  return (
    <ModalContainer modalKey={ModalKey.REPORT}>
      <ModalContent css={{ maxWidth: 520 }}>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
        >
          <ReportFormContainer
            email={currentUserAuthData?.user?.email}
            publicKey={publicKey}
            reportedPublicKey={reportedPublicKey}
            pageType={pageType}
            onClose={handleClose}
          />
        </GoogleReCaptchaProvider>
      </ModalContent>
    </ModalContainer>
  );
}

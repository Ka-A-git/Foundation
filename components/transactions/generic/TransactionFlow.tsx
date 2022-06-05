import { Formik, Form, FormikConfig, FormikProps } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { cond } from 'ramda';

import { isNonUserRejectedError } from 'utils/transactions';

import Box from 'components/base/Box';
import TransactionErrorPane from 'components/transactions/generic/TransactionErrorPane';
import TransactionAwaitingConfirmation from 'components/transactions/generic/TransactionAwaitingConfirmation';
import TransactionProgressPane from './TransactionProgressPane';
import TransactionHashLink from '../TransactionHashLink';
import TransactionPaneSkeleton from './TransactionPaneSkeleton';

import { TransactionError } from './types';

type TransactionPending = {
  title: string;
  description: string;
};

type TransactionLoading = {
  isLoading: boolean;
};

type TransactionSuccess<T> = {
  isSuccess: boolean;
  component: (arg0: FormikProps<T>) => JSX.Element;
};

type TransactionAwaiting<T> = {
  component: (arg0: FormikProps<T>) => JSX.Element;
};

interface TransactionFlowProps<T> {
  txHash: string;
  formProps: FormikConfig<T>;
  steps: CondFn<T>[];
  transactionState: {
    awaiting?: TransactionAwaiting<T>;
    error: {
      description: string;
      error: TransactionError;
      onReset: () => void;
    };
    pending: TransactionPending;
    success: TransactionSuccess<T>;
    loading: TransactionLoading;
  };
}

type CondFn<T> = [
  (arg0: FormikProps<T>) => boolean,
  (arg0: FormikProps<T>) => JSX.Element
];

// TODO: handle success state props
// TODO: handle default steps

export default function TransactionFlow<T>(props: TransactionFlowProps<T>) {
  const { transactionState, steps, formProps, txHash } = props;

  return (
    <Formik<T>
      enableReinitialize
      initialValues={formProps.initialValues}
      validationSchema={formProps.validationSchema}
      onSubmit={formProps.onSubmit}
    >
      {(formikState) => (
        <Form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <AnimatePresence exitBeforeEnter>
            {cond<FormikProps<T>, JSX.Element>([
              [
                () => transactionState.loading.isLoading,
                () => <TransactionPaneSkeleton />,
              ],
              [
                () => isNonUserRejectedError(transactionState.error.error),
                () => (
                  <TransactionErrorPane
                    description={transactionState.error.description}
                    onReset={transactionState.error.onReset}
                    error={transactionState.error.error}
                    key="error"
                  />
                ),
              ],
              [
                () => Boolean(transactionState.success.isSuccess),
                () => transactionState.success.component(formikState),
              ],
              [
                () => Boolean(txHash),
                () => (
                  <TransactionProgressPane
                    title={transactionState.pending.title}
                    description={
                      <Box>{transactionState.pending.description}</Box>
                    }
                    status="pending"
                    meta={<TransactionHashLink txHash={txHash} />}
                  />
                ),
              ],
              [
                () => formikState.isSubmitting,
                (formikState) =>
                  transactionState.awaiting ? (
                    transactionState.awaiting.component(formikState)
                  ) : (
                    <TransactionAwaitingConfirmation key="awaiting" />
                  ),
              ],
              ...steps,
            ])(formikState)}
          </AnimatePresence>
        </Form>
      )}
    </Formik>
  );
}

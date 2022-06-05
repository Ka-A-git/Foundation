import { styled } from 'stitches.config';
import { Form, Formik } from 'formik';
import { useCallback, useEffect } from 'react';
import { compose, cond, T } from 'ramda';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { useAccount, useWaitForTransaction } from 'wagmi';

import TransactionAwaitingConfirmation from 'components/transactions/generic/TransactionAwaitingConfirmation';
import WithdrawFields from 'components/transactions/withdraw/WithdrawFields';
import WithdrawTransactionPending from 'components/transactions/withdraw/WithdrawTransactionPending';
import WithdrawTransactionSuccess from 'components/transactions/withdraw/WithdrawTransactionSuccess';
import { WithLayout } from 'components/layouts/Layout';
import Page from 'components/Page';
import Box from 'components/base/Box';

import useWithdrawFeth from 'hooks/web3/transactions/use-withdraw-feth';
import useBalances from 'hooks/web3/use-balances';
import useLastBlockNumber from 'hooks/web3/use-last-block-number';
import useMadeOffersCount from 'hooks/queries/hasura/markets/use-made-offers-count';

import { getFirstValue, isAnyTrue } from 'utils/helpers';
import { isNonUserRejectedError } from 'utils/transactions';
import WithdrawTransactionError from 'components/transactions/withdraw/WithdrawTransactionError';
import { WithdrawSchema } from 'schemas/withdraw';
import { useQueryClient } from 'react-query';
import { QueryCacheKey } from 'types/Queries';

const Container = styled(Box, {
  flex: 'auto',
  maxWidth: 640,
  marginX: 'auto',
  paddingY: '$9',
  width: '100%',
});

Withdraw.getLayout = compose<JSX.Element, JSX.Element, JSX.Element>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  WithLayout({ backgroundColor: '$black5' })
);

export default function Withdraw() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [{ data: user }] = useAccount();

  const { data: balancesData, isLoading: isBalancesLoading } = useBalances({
    publicKey: user?.address,
  });

  const { data: madeOffersData } = useMadeOffersCount({
    publicKey: user?.address,
  });

  const txHash = getFirstValue(router.query.txHash);
  const [{ data: txReceipt, error: txError }] = useWaitForTransaction({
    hash: txHash,
    confirmations: 2,
  });

  const lastBlockNumber = useLastBlockNumber(txHash);
  const { data: prevBalancesData } = useBalances({
    publicKey: user?.address,
    overrides: {
      blockTag: lastBlockNumber,
    },
  });

  const { mutateAsync: withdrawFeth, reset: resetWithdrawFeth } =
    useWithdrawFeth();

  const handleSubmit = useCallback(async () => {
    const tx = await withdrawFeth();
    await router.push({
      pathname: router.pathname,
      query: { ...router.query, txHash: tx.hash },
    });
  }, [router, withdrawFeth]);

  const isSuccess = txReceipt;
  const error = txError;

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries([QueryCacheKey.Balances]);
    }
  }, [isSuccess, queryClient]);

  return (
    <Page title="Balance">
      <Container>
        <Formik
          initialValues={{
            balance: balancesData?.availableFethBalance,
          }}
          validationSchema={WithdrawSchema}
          validateOnMount
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(formikState) => (
            <Form
              style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
            >
              <AnimatePresence exitBeforeEnter>
                {cond<boolean, JSX.Element>([
                  // TODO: buy now already set
                  [
                    () => isNonUserRejectedError(error),
                    // TODO: make this a generic shared component
                    () => (
                      <WithdrawTransactionError
                        onReset={resetWithdrawFeth}
                        error={error}
                        key="error"
                      />
                    ),
                  ],
                  [
                    () => Boolean(isSuccess),
                    () => (
                      <WithdrawTransactionSuccess
                        amount={prevBalancesData?.availableFethBalance}
                      />
                    ),
                  ],
                  [
                    () => Boolean(txHash),
                    // TODO: make this a generic shared component
                    () => (
                      <WithdrawTransactionPending
                        key="pending"
                        txHash={txHash}
                      />
                    ),
                  ],
                  [
                    () => formikState.isSubmitting,
                    () => <TransactionAwaitingConfirmation key="awaiting" />,
                  ],
                  [
                    T,
                    () => (
                      <WithdrawFields
                        fethBalance={balancesData?.availableFethBalance}
                        isBalancesLoading={isAnyTrue([
                          isBalancesLoading,
                          !balancesData,
                        ])}
                        lockedFethBalance={balancesData?.lockedFethBalance}
                        offersCount={madeOffersData}
                      />
                    ),
                  ],
                ])()}
              </AnimatePresence>
            </Form>
          )}
        </Formik>
      </Container>
    </Page>
  );
}

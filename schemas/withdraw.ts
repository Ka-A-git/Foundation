import * as Yup from 'yup';

export const WithdrawSchema = Yup.object().shape({
  balance: Yup.number()
    .min(0.01, 'Must be at least ${min} ETH')
    .required('Amount required')
    .nullable(),
});

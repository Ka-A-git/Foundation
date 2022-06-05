import * as Yup from 'yup';

import { CancelReserveAuctionVariables } from 'hooks/web3/transactions/use-cancel-reserve-auction';

export const CancelReserveAuctionSchema: Yup.SchemaOf<CancelReserveAuctionVariables> =
  Yup.object().shape({
    auctionId: Yup.number().required('Auction is already unlisted'),
  });

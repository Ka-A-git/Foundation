import * as Yup from 'yup';

import { FinalizeReserveAuctionVariables } from 'hooks/web3/transactions/use-finalize-reserve-auction';

export const SettleAuctionSchema: Yup.SchemaOf<FinalizeReserveAuctionVariables> =
  Yup.object().shape({
    auctionId: Yup.number().required('Auction already settled'),
  });

import { compose } from 'ramda';
import { ReactNode } from 'react';

import { PageType } from 'types/page';

import TransactionGuard, { TransactionGuardProps } from './TransactionGuard';
import TransactionLayoutWithCardV2 from 'components/layouts/TransactionLayoutWithCardV2';

export const buildTransactionLayout = (
  title: string,
  args: TransactionGuardProps
) =>
  compose<JSX.Element, JSX.Element, JSX.Element>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    TransactionLayoutWithCardV2({
      title,
      backgroundColor: '$black5',
      pageType: PageType.minimalLoggedIn,
      artworkQueryType: args['artworkQueryType'],
    }),
    (page: ReactNode) => TransactionGuard(page, args)
  );

export const getTransactionLayout = (title: string) =>
  buildTransactionLayout(title, {
    artworkQueryType: 'tokenId',
    pageGuards: ['user-moderated', 'artwork-moderated'],
  });

export const getNonModeratedTransactionLayout = (title: string) =>
  buildTransactionLayout(title, {
    artworkQueryType: 'tokenId',
    pageGuards: [],
  });

export const getCollectionCreateLayout = (title: string) =>
  buildTransactionLayout(title, {
    artworkQueryType: 'create-collection',
    pageGuards: ['approved-creator', 'social-verification', 'user-moderated'],
  });

export const getCollectionLayout = (title: string) =>
  buildTransactionLayout(title, {
    artworkQueryType: 'collection-slug',
    pageGuards: ['approved-creator', 'social-verification', 'user-moderated'],
  });

export const getMintLayout = (title: string) =>
  buildTransactionLayout(title, {
    artworkQueryType: 'uuid',
    pageGuards: ['approved-creator', 'social-verification', 'user-moderated'],
  });

export const getTagsLayout = (title: string) =>
  buildTransactionLayout(title, {
    artworkQueryType: 'uuid',
    pageGuards: ['user-moderated', 'artwork-moderated'],
  });

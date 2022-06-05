import { gql } from 'graphql-request';

import { fndServerClient } from 'lib/clients/graphql';

import { ModerationStatus } from 'types/Moderation';
import { notEmptyOrNil } from 'utils/helpers';

export interface SetArtworkModerationProxyProps {
  id: string;
  tokenId: string;
  moderationStatus: ModerationStatus;
  moderationFrom: string;
  adminAddress: string;
  url: string;
}

export async function setArtworkModerationProxy({
  id,
  tokenId,
  moderationStatus,
  moderationFrom,
  adminAddress,
  url,
}: SetArtworkModerationProxyProps): Promise<{ done: boolean }> {
  const res = await fetch('/api/admin/moderate-artwork', {
    method: 'POST',
    body: JSON.stringify({
      id,
      tokenId,
      moderationStatus,
      moderationFrom,
      adminAddress,
      url,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return await res.json();
  }
  return Promise.reject();
}

interface SetArtworkModerationStatusProps {
  id: string;
  moderationStatus: ModerationStatus;
  moderationFrom: string;
  authToken: string;
}

const SET_ARTWORK_MODERATION_STATUS = gql`
  mutation setArtworkModerationStatus(
    $id: String!
    $moderationStatus: UserModerationStatus!
  ) {
    updateArtworkModerationStatus(
      id: $id
      moderationStatus: $moderationStatus
    ) {
      moderationStatus
    }
  }
`;

export async function setArtworkModerationStatus({
  id,
  moderationStatus,
  moderationFrom,
  authToken,
}: SetArtworkModerationStatusProps): Promise<{
  updateArtworkModerationStatus: { moderationStatus: ModerationStatus };
}> {
  const client = fndServerClient(authToken);

  const hasModerationFrom = notEmptyOrNil(moderationFrom);

  if (hasModerationFrom) {
    await setArtworkModerationFrom({
      id,
      moderationFrom,
      authToken,
    });
  }

  return await client.request(SET_ARTWORK_MODERATION_STATUS, {
    id,
    moderationStatus,
  });
}

const SET_ARTWORK_MODERATION_FROM = gql`
  mutation setArtworkModerationFrom($id: String!, $moderationFrom: String!) {
    updateArtworkModerationFrom(id: $id, moderationFrom: $moderationFrom) {
      moderationStatus
    }
  }
`;

async function setArtworkModerationFrom({
  id,
  moderationFrom,
  authToken,
}: Omit<SetArtworkModerationStatusProps, 'moderationStatus'>) {
  const client = fndServerClient(authToken);
  await client.request(SET_ARTWORK_MODERATION_FROM, {
    id: id,
    moderationFrom,
  });
}

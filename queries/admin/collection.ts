import { gql } from 'graphql-request';
import { fndDataClient } from 'lib/clients/fnd-data';

import { fndServerClient } from 'lib/clients/graphql';
import { ModerationStatus } from 'types/Moderation';

export interface SetCollectionModerationProxyProps {
  id: string;
  moderationStatus: ModerationStatus;
  adminAddress: string;
  url: string;
}

export async function setCollectionModerationProxy({
  id,
  moderationStatus,
  adminAddress,
  url,
}: SetCollectionModerationProxyProps): Promise<{
  done: boolean;
}> {
  const res = await fetch('/api/admin/moderate-collection', {
    method: 'POST',
    body: JSON.stringify({ id, moderationStatus, adminAddress, url }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return await res.json();
  }
  throw new Error('An error occurred at this endpoint');
}

interface SetCollectionModerationStatusProps {
  id: string;
  moderationStatus: ModerationStatus;
  authToken: string;
}

const SET_COLLECTION_MODERATION_STATUS = gql`
  mutation setCollectionModerationStatus(
    $id: String!
    $moderationStatus: UserModerationStatus!
  ) {
    updateCollectionModerationStatus(
      id: $id
      moderationStatus: $moderationStatus
    ) {
      moderationStatus
    }
  }
`;

export async function setCollectionModerationStatus({
  id,
  moderationStatus,
  authToken,
}: SetCollectionModerationStatusProps): Promise<{
  updateUserModerationStatus: { moderationStatus: ModerationStatus };
}> {
  const client = fndServerClient(authToken);
  return await client.request(SET_COLLECTION_MODERATION_STATUS, {
    id,
    moderationStatus,
  });
}

interface DoImportCollectionCheckProps {
  contractAddress: string;
  adminPublicKey: string;
}

export async function doImportCollectionCheck({
  contractAddress,
  adminPublicKey,
}: DoImportCollectionCheckProps) {
  return await fndDataClient({
    url: '/pre_import_collection_validation',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contractAddress, userPublicKey: adminPublicKey }),
    },
  });
}

interface DoImportCollectionProps {
  contractAddress: string;
  adminPublicKey: string;
  creatorAddress: string;
}

export async function doImportCollection({
  contractAddress,
  adminPublicKey,
  creatorAddress,
}: DoImportCollectionProps) {
  return await fndDataClient({
    url: '/import_collection',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractAddress,
        userPublicKey: adminPublicKey,
        creatorAddress,
      }),
    },
  });
}

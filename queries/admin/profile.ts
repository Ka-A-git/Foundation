import { gql } from 'graphql-request';
import { getAddress } from '@ethersproject/address';

import { fndServerClient } from 'lib/clients/graphql';
import { ModerationStatus } from 'types/Moderation';

export interface SetProfileModerationProxyProps {
  id: string;
  moderationStatus: ModerationStatus;
  adminAddress: string;
  url: string;
}

export async function setProfileModerationProxy({
  id,
  moderationStatus,
  adminAddress,
  url,
}: SetProfileModerationProxyProps): Promise<{
  done: boolean;
}> {
  const res = await fetch('/api/admin/moderate-profile', {
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

interface SetProfileModerationStatusProps {
  id: string;
  moderationStatus: ModerationStatus;
  authToken: string;
}

const SET_PROFILE_MODERATION_STATUS = gql`
  mutation setProfileModerationStatus(
    $publicKey: String!
    $moderationStatus: UserModerationStatus!
  ) {
    updateUserModerationStatus(
      userPublicKey: $publicKey
      moderationStatus: $moderationStatus
    ) {
      moderationStatus
    }
  }
`;

export async function setProfileModerationStatus({
  id,
  moderationStatus,
  authToken,
}: SetProfileModerationStatusProps): Promise<{
  updateUserModerationStatus: { moderationStatus: ModerationStatus };
}> {
  const client = fndServerClient(authToken);
  return await client.request(SET_PROFILE_MODERATION_STATUS, {
    publicKey: getAddress(id),
    moderationStatus,
  });
}

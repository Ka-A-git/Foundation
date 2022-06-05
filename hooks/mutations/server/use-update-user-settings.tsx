import { useMutation, UseMutationResult } from 'react-query';
import { gql, ClientError } from 'graphql-request';

import { fndServerClient } from 'lib/clients/graphql';

import { EmailSettings } from 'types/Account';

const UPDATE_USER_SETTINGS = gql`
  mutation UpdateEmailSettings(
    $publicKey: String!
    $data: EmailSettingUpdate!
  ) {
    updateEmailSetting(publicKey: $publicKey, data: $data) {
      newNFT
      auctions
    }
  }
`;

export async function updateUserSettings({
  publicKey,
  data,
}: UpdateUserSettingsArgs): Promise<UpdateUserSettingsData> {
  const client = fndServerClient();
  return await client.request<UpdateUserSettingsData, UpdateUserSettingsArgs>(
    UPDATE_USER_SETTINGS,
    {
      publicKey,
      data,
    }
  );
}

interface UpdateUserSettingsArgs {
  publicKey: string;
  data: EmailSettings;
}

interface UpdateUserSettingsData {
  updateEmailSetting: EmailSettings;
}

export default function useUpdateUserSettings(): UseMutationResult<
  UpdateUserSettingsData,
  ClientError,
  UpdateUserSettingsArgs
> {
  return useMutation(updateUserSettings);
}

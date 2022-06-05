import * as Types from '../types-hasura.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserSettingsVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
}>;


export type UserSettings = { user?: Types.Maybe<{ emailSettings?: Types.Maybe<Pick<Types.Email_Setting, 'auctions' | 'newNFT' | 'privateSales' | 'buyNows' | 'offers'>> }> };


export const UserSettingsDocument = /*#__PURE__*/ `
    query UserSettings($publicKey: String!) {
  user: user_by_pk(publicKey: $publicKey) {
    emailSettings: email_setting {
      auctions
      newNFT
      privateSales
      buyNows
      offers
    }
  }
}
    `;
export const useUserSettings = <
      TData = UserSettings,
      TError = Error
    >(
      variables: UserSettingsVariables,
      options?: UseQueryOptions<UserSettings, TError, TData>
    ) =>
    useQuery<UserSettings, TError, TData>(
      ['UserSettings', variables],
      hasuraFetcher<UserSettings, UserSettingsVariables>(UserSettingsDocument, variables),
      options
    );

useUserSettings.getKey = (variables: UserSettingsVariables) => ['UserSettings', variables];
;

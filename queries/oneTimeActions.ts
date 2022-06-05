import { gql } from 'graphql-request';

import { fndServerClient } from 'lib/clients/graphql';
import { ActionType } from 'types/ActionType';

interface SetUserOneTimeAction {
  recordOneTimeAction: { createdAt: string }[];
}

interface SetUserOneTimeActionArgs {
  actionType: ActionType;
}

export const SET_ONE_TIME_ACTION = gql`
  mutation setOneTimeAction($actionType: String!) {
    recordOneTimeAction(actionType: $actionType) {
      createdAt
    }
  }
`;

export async function setUserOneTimeAction({
  actionType,
}: SetUserOneTimeActionArgs): Promise<SetUserOneTimeAction> {
  const client = fndServerClient();
  return await client.request<SetUserOneTimeAction>(SET_ONE_TIME_ACTION, {
    actionType,
  });
}

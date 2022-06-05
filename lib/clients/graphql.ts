import { GraphQLClient } from 'graphql-request';
import { queryClient } from 'lib/reactQueryClient';

import { getSubgraphApi } from 'lib/subgraphApi';
import { QueryCacheKey } from 'types/Queries';

export const fndServerClient = (token?: string): GraphQLClient => {
  const { NEXT_PUBLIC_SERVER_URL } = process.env;
  const graphQLURL = new URL('graphql', NEXT_PUBLIC_SERVER_URL);
  // token from param is only really used in the initial auth as its an api call and query client is undefined there.
  // const authToken = token ?? queryClient.getQueryData(QueryCacheKey.AuthToken);
  const authToken = token ?? queryClient.getQueryData(QueryCacheKey.AuthToken);
  return new GraphQLClient(graphQLURL.href, {
    headers: { ...(authToken && { authorization: `Bearer ${authToken}` }) },
  });
};

export const fndHasuraClient = (): GraphQLClient => {
  const { NEXT_PUBLIC_HASURA_URL } = process.env;

  const graphQLURL = new URL(NEXT_PUBLIC_HASURA_URL);
  // If this is being user server-side
  if (typeof window === 'undefined') {
    const HASURA_GRAPHQL_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET;
    return new GraphQLClient(graphQLURL.href, {
      headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET,
        'x-hasura-role': 'backend',
      },
    });
  } else {
    return new GraphQLClient(graphQLURL.href);
  }
};

export const fndGraphClient = (): GraphQLClient => {
  const { NEXT_PUBLIC_CHAIN_ID } = process.env;
  const graphApi = getSubgraphApi(Number(NEXT_PUBLIC_CHAIN_ID));
  const graphQLURL = new URL(graphApi);

  return new GraphQLClient(graphQLURL.href);
};

export const useServerFetcher = <TData, TVariables>(
  query: string
): (() => Promise<TData>) => {
  return async (variables?: TVariables) => {
    const client = fndServerClient();
    return await client.request<TData, TVariables>(query, variables);
  };
};

export const hasuraFetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables
): (() => Promise<TData>) => {
  return async () => {
    const client = fndHasuraClient();
    return await client.request<TData, TVariables>(query, variables);
  };
};

export const subgraphFetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables
): (() => Promise<TData>) => {
  return async () => {
    const client = fndGraphClient();
    return await client.request<TData, TVariables>(query, variables);
  };
};

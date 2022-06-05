import * as Sentry from '@sentry/nextjs';
import { gql } from 'graphql-request';
import { PinataApiKeyResult } from 'hooks/web3/use-generate-pinata-key';

import { fndServerClient } from 'lib/clients/graphql';
import { getError } from 'utils/helpers';

const SIGN_FILES = gql`
  mutation signFiles($files: [FileInput!]!) {
    signFiles(files: $files) {
      signedRequest
      url
    }
  }
`;

export async function signFiles({ files }) {
  const client = fndServerClient();
  return await client.request(SIGN_FILES, { files });
}

export const uploadFile = async (file, signedRequest, url) => {
  const options = {
    method: 'PUT',
    body: file,
  };
  const res = await fetch(signedRequest, options);
  if (!res.ok) {
    const err = new Error(`${res.status}: ${res.statusText}`);
    Sentry.captureException(getError(err));
    throw err;
  }
  return url;
};

export const generatePinataApiKey = async (): Promise<PinataApiKeyResult> => {
  const res = await fetch('/api/pinata/generate-api-key', {
    method: 'POST',
  });
  if (!res.ok) {
    const err = new Error(`${res.status}: ${res.statusText}`);
    Sentry.captureException(getError(err));
    throw err;
  }
  return await res.json();
};

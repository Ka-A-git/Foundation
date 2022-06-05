import { gql } from 'graphql-request';
import { getAddress } from '@ethersproject/address';

import { fndServerClient } from 'lib/clients/graphql';
import { PageType, ReportReason } from 'types/Report';

// Local server endpoint

export interface SendReportProps {
  recaptchaToken: string;
  email: string;
  issue: string;
  url: string;
  originalUrl: string;
  issueReason: ReportReason;
  reporterPublicKey: string;
  reportedPublicKey: string;
  pageType: PageType;
}

export async function sendReport({
  recaptchaToken,
  email,
  issue,
  url,
  originalUrl,
  issueReason,
  reporterPublicKey,
  reportedPublicKey,
  pageType,
}: SendReportProps): Promise<{ done: boolean }> {
  const res = await fetch('/api/admin/report', {
    method: 'POST',
    body: JSON.stringify({
      recaptchaToken,
      email,
      issue,
      url,
      originalUrl,
      issueReason,
      reporterPublicKey,
      reportedPublicKey,
      pageType,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return await res.json();
  }
  throw new Error('An error occurred at this endpoint');
}

interface SetInvitesProps {
  publicAddress: string;
  count: number;
}

const SET_INVITES = gql`
  mutation setInvites(
    $publicKey: String!
    $count: Float!
    $requestType: String!
  ) {
    generateInviteCodesFor(
      publicKey: $publicKey
      count: $count
      requestType: $requestType
    )
  }
`;

export async function setInvites({
  publicAddress,
  count,
}: SetInvitesProps): Promise<{ done: boolean }> {
  const client = fndServerClient();
  return await client.request(SET_INVITES, {
    publicKey: getAddress(publicAddress),
    count: count,
    requestType: 'New Count',
  });
}

export interface sendMigrateAccountArgs {
  signature: string;
  to: string;
  from: string;
}

export async function sendMigrateAccount({
  signature,
  to,
  from,
}: sendMigrateAccountArgs): Promise<{ done: boolean }> {
  const res = await fetch('/api/admin/migrate-account', {
    method: 'POST',
    body: JSON.stringify({
      signature,
      to,
      from,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return await res.json();
  }
  throw new Error('An error occurred at this endpoint');
}

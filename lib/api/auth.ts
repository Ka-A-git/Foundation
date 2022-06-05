import { NextApiRequest, NextApiResponse } from 'next';
import { verifyMessage } from '@ethersproject/wallet';
import { serialize } from 'cookie';

export const COOKIE_TOKEN_NAME = 'fnd_token';
// 30 days
const MAX_AGE = 60 * 60 * 24 * 30;

export function getTokenFromCookie(req: NextApiRequest): string {
  const token = req.cookies[COOKIE_TOKEN_NAME];

  return token;
}

export function setTokenCookie(
  res: { setHeader: (arg0: string, arg1: any) => void },
  token: string
): void {
  const cookie = serialize(COOKIE_TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
  res.setHeader('Set-Cookie', cookie);
}

export function removeTokenCookie(res: NextApiResponse): void {
  const cookie = serialize(COOKIE_TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function verifyExpiryDate(message: string) {
  const lines = message.split('\n');
  const expiryDate = lines[1].replace('Expires on:', '').trim();
  return Number(expiryDate) > Math.floor(Date.now() / 1000);
}

export const getPublicKeyAndMessageFromToken = async (token: string) => {
  // Separate out the various pieces of data
  // Order of args must be {message}.{signature}.{publicKey}
  const [data, signature] = token.split('.');
  // Convert from base64 into normal strings
  const message = Buffer.from(data, 'base64').toString();

  // This handles the standard EOA wallet
  const publicKey = verifyMessage(message, signature);

  return { publicKey, message };
};

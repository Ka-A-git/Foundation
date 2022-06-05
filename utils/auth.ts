import { includes } from 'ramda';

export const isAuthenticatedRoute = (pathname: string): boolean => {
  const authenticatedRoutes = [
    '/[username]/[contractAddress]/[tokenId]/bid',
    '/[username]/[contractAddress]/[tokenId]/bid/submitted',
    '/[username]/[contractAddress]/[tokenId]/settle',
    '/[username]/[contractAddress]/[tokenId]/settle/submitted',
    '/[username]/[contractAddress]/[tokenId]/list',
    '/[username]/[contractAddress]/[tokenId]/list/submitted',
    '/[username]/[contractAddress]/[tokenId]/change-price',
    '/[username]/[contractAddress]/[tokenId]/unlist',
    '/admin/approve',
    '/create',
    '/create/upload',
    '/create/collection',
    '/create/mint/[id]',
    '/create/list/[contractAddress]/[tokenId]',
    '/creator/[contractAddress]/[tokenId]/tags',
    '/profile',
    '/profile/verify',
    '/profile/verify/twitter',
    '/profile/verify/instagram',
    '/invite',
    '/join',
    '/notifications',
    '/settings',
    '/migrate-account',
    '/activity',
  ];

  return includes(pathname, authenticatedRoutes);
};

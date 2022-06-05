import { ArtworkMeta, buildArtworkPath } from 'utils/artwork/artwork';

import { UserLight } from 'types/Account';

interface BuildBidPathProps {
  creator: UserLight;
  artwork: ArtworkMeta;
}

export function buildBidPath({ creator, artwork }: BuildBidPathProps) {
  const basePath = buildArtworkPath({ user: creator, artwork });
  return `${basePath}/bid`;
}

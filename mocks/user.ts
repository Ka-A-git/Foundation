import { UserFragment } from 'graphql/hasura/hasura-fragments.generated';

import { ModerationStatus } from 'types/Moderation';

// TODO: generate these mock factories. Manually maintaining is a bit of a pain.
export const createUserMock = (
  overrides: Partial<UserFragment> = {}
): UserFragment => {
  return {
    userIndex: 65,
    publicKey: '0x8A05fA58d533a6e40C4381E3247Cf4c68ca61cdc',
    username: 'arnold',
    profileImageUrl:
      'https://f8n-staging.s3.amazonaws.com/creators/profile/rmq8mrc2s-1-hey-arnold-0-jpg-ud5s4j.jpg',
    coverImageUrl:
      'https://f8n-staging.s3.amazonaws.com/creators/profile/iu8f420zh-k-jpeg-knvhie.jpeg',
    name: 'Hey Arnold',
    bio: 'Hey Arnold!',
    isApprovedCreator: true,
    moderationStatus: ModerationStatus.Active,
    joinedWaitlistAt: null,
    createdAt: '2021-05-26T14:52:15.855415',
    isApprovedForMigrationAt: null,
    isAdmin: true,
    links: null,
    ...overrides,
  };
};

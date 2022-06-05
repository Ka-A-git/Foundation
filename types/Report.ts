export enum ReportReason {
  ViolentContent = 'ViolentContent',
  HatefulContent = 'HatefulContent',
  SexualContent = 'SexualContent',
  UserMisrepresentation = 'UserMisrepresentation',
  IP = 'IP',
  StolenArtwork = 'StolenArtwork',
  SuspiciousActivity = 'SuspiciousActivity',
}

export type PageType = 'Profile' | 'Artwork' | 'Collection';

import Avatar, { AvatarProps } from 'components/base/Avatar';

type CollectionLogoProps = Pick<
  AvatarProps,
  'alt' | 'imageUrl' | 'css' | 'stroke'
>;

export default function CollectionLogo(props: CollectionLogoProps) {
  return <Avatar {...props} appearance="frosted" shape={2} />;
}

import UserInfoFields from './UserInfoFields';
import UserBioFields from './UserBioFields';
import UserAvatarFields from './UserAvatarFields';
import UserCoverFields from './UserCoverFields';
import UserSocialFields from './UserSocialFields';
import UserEmailFields from './UserEmailFields';
import UserVerifyFields from './UserVerifyFields';
import SocialVerification from 'types/SocialVerification';

interface UserFormFieldsProps {
  twitterSocialVerification: SocialVerification;
  instagramSocialVerification: SocialVerification;
}

export default function UserFormFields(
  props: UserFormFieldsProps
): JSX.Element {
  const { twitterSocialVerification, instagramSocialVerification } = props;

  return (
    <>
      <UserInfoFields />
      <UserEmailFields />
      <UserBioFields />
      <UserAvatarFields />
      <UserCoverFields />
      <UserVerifyFields
        twitterSocialVerification={twitterSocialVerification}
        instagramSocialVerification={instagramSocialVerification}
      />
      <UserSocialFields />
    </>
  );
}

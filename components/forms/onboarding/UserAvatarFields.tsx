import Box from 'components/base/Box';
import Paragraph from 'components/base/Paragraph';

import FormBlock from 'components/forms/FormBlock';
import { FileUploadField } from '../FileUpload';

export default function UserBioFields(): JSX.Element {
  return (
    <FormBlock
      title="Upload a profile image."
      hintText={
        <Paragraph css={{ marginBottom: '$4' }}>
          Recommended size:
          <br /> 1000x1000px.
          <br />
          JPG, PNG, or GIF.
          <br /> 10MB max size.
        </Paragraph>
      }
    >
      <Box>
        <Box css={{ marginBottom: 10 }}>
          <FileUploadField<{ profileImageUrl: string }>
            name="profileImageUrl"
            // 10mb in bytes
            maxSize={10000000}
          />
        </Box>
      </Box>
    </FormBlock>
  );
}

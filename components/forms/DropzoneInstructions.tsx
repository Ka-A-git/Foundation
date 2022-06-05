import Text from 'components/base/Text';

interface DropzoneInstructionsProps {
  isDragActive: boolean;
}

export default function DropzoneInstructions(props: DropzoneInstructionsProps) {
  const { isDragActive } = props;
  return (
    <Text size={0} css={{ color: 'currentColor', textAlign: 'center' }}>
      {isDragActive ? (
        <>Drop image to upload</>
      ) : (
        <>
          Drag and drop
          <br />
          or click to upload
        </>
      )}
    </Text>
  );
}

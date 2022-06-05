import { Formik, Form } from 'formik';

import Box from 'components/base/Box';
import Grid from 'components/base/Grid';
import CheckboxAndWrapper from 'components/forms/CheckboxAndWrapper';
import FormikSubmitButton from 'components/forms/FormikSubmitButton';

import { propOrEmptyString } from 'utils/strings';

import { useRemoveWeb2Data } from 'graphql/server/mutations/remove-web2-data.generated';

import Account from 'types/Account';

interface RemoveWeb2DataFormValues {
  userPublicKey: string;
  removeWeb2Data: boolean;
}

interface RemoveWeb2DataPaneProps {
  user: Account;
}

export default function RemoveWeb2DataPane(
  props: RemoveWeb2DataPaneProps
): JSX.Element {
  const { user } = props;

  const { mutateAsync: removWeb2Data } = useRemoveWeb2Data();

  const handleSubmit = async (values: RemoveWeb2DataFormValues) => {
    if (values.removeWeb2Data) {
      await removWeb2Data({
        userPublicKey: values.userPublicKey,
      });
    }
  };

  return (
    <Box css={{ padding: '$6' }}>
      <Formik<RemoveWeb2DataFormValues>
        initialValues={{
          userPublicKey: propOrEmptyString('publicKey')(user),
          removeWeb2Data: false,
        }}
        onSubmit={handleSubmit}
        enableReinitialize={!user}
      >
        <Form>
          <Grid css={{ gap: '$4' }}>
            <CheckboxAndWrapper
              name="removeWeb2Data"
              label="Remove Web2 data"
              description="Do you want to remove all Web2 data associated with this user?"
            />

            <FormikSubmitButton
              label="Remove Web2 data"
              submittingLabel="Removing Web2 data…"
              submittedLabel="Web2 data removed"
            />
          </Grid>
        </Form>
      </Formik>
    </Box>
  );
}

import { useEffect } from 'react';
import { useField } from 'formik';

import Grid from 'components/base/Grid';
import Box from 'components/base/Box';
import Paragraph from 'components/base/Paragraph';
import TransactionParagraph from '../TransactionParagraph';
import TransactionHeading from '../TransactionHeading';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import TransactionDivider from '../TransactionDivider';

import TextLink from 'components/base/TextLink';
import TextField from 'components/forms/fields/TextField';

import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

import { SYMBOL_CHARACTER_LIMIT_ERROR } from 'schemas/collection';
import { CreateCollectionFormValues } from './types';

export default function CreateCollectionFields() {
  return (
    <TransitionPane>
      <TransactionCard>
        <Box>
          <TransactionHeading>Create a collection</TransactionHeading>
          <TransactionParagraph>
            Deploy a smart contract to showcase NFTs.
          </TransactionParagraph>
          <TransactionDivider />
          <TransactionHeading size="small">
            Set up your smart contract
          </TransactionHeading>
          <Paragraph size="sub" css={{ marginBottom: '$4' }}>
            The following details are used to create your own smart contract.
            They will be added to the blockchain and cannot be edited.
          </Paragraph>
          <Paragraph>
            <TextLink
              css={{ '@bp0-max': { fontSize: '$0' } }}
              target="_blank"
              rel="noreferrer"
              href="https://help.foundation.app/hc/en-us/articles/4419483563931"
            >
              Learn more about smart contracts
            </TextLink>
          </Paragraph>
          <Grid css={{ marginTop: '$8', gap: '$7' }}>
            <TextField name="name" label="Collection Name" />
            <SymbolInputField name="symbol" label="Collection Symbol" />
            <TransactionSubmitButton
              showErrors={false}
              label="Continue"
              submittingLabel="Continue"
              submittedLabel="Continue"
            />
          </Grid>
        </Box>
      </TransactionCard>
    </TransitionPane>
  );
}

interface SymbolInputFieldProps {
  label: string;
  name: string;
}

function SymbolInputField(props: SymbolInputFieldProps): JSX.Element {
  const { label, name } = props;

  const [, meta, helpers] = useField<CreateCollectionFormValues['name']>(name);

  const hasCharacterLimitError = meta?.error === SYMBOL_CHARACTER_LIMIT_ERROR;
  const hasTouched = meta.touched;
  const setTouched = helpers.setTouched;

  useEffect(() => {
    if (hasCharacterLimitError && !hasTouched) {
      setTouched(true);
    }
  }, [hasCharacterLimitError, hasTouched, setTouched]);

  return (
    <TextField
      name={name}
      label={label}
      css={{
        '& input': {
          textTransform: 'uppercase',
          fontFamily: '$mono',
          letterSpacing: '$mono',
        },
      }}
    />
  );
}

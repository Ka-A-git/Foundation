import React from 'react';

import TransitionPane from 'components/animation/TransitionPane';
import TransactionParagraph from '../TransactionParagraph';
import TransactionHeading from '../TransactionHeading';
import TagsTextarea from './TagsTextarea';
import { TransactionCard } from 'components/layouts/TransactionLayoutV2';
import {
  PreviousPageButtonAnchor,
  PreviousPageLink,
} from 'components/navigation/PreviousPageButton';

import { Option } from './types';

interface TagsFieldsProps {
  listArtworkPath: string;
  isInCreatorFlow: boolean;
  options: Option[];
}

export default function TagsFields(props: TagsFieldsProps) {
  const { listArtworkPath, options, isInCreatorFlow } = props;

  return (
    <>
      {!isInCreatorFlow && (
        <PreviousPageButtonAnchor
          css={{ display: 'none', '@bp4': { display: 'block' } }}
        >
          <PreviousPageLink href={listArtworkPath} />
        </PreviousPageButtonAnchor>
      )}

      <TransitionPane>
        <TransactionCard>
          <TransactionHeading>Add tags</TransactionHeading>
          <TransactionParagraph css={{ marginBottom: '$7' }}>
            Add up to 10 tags to your NFT to help people find and discover it
            across Foundation. Use the return key to add multiple.
          </TransactionParagraph>
          <TagsTextarea
            name="data.tags"
            options={options}
            listArtworkPath={listArtworkPath}
            isInCreatorFlow={isInCreatorFlow}
          />
        </TransactionCard>
      </TransitionPane>
    </>
  );
}

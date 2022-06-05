import { UseQueryOptions, useQuery } from 'react-query';
import { useEffect } from 'react';
import { useProvider } from 'wagmi';
import { BaseProvider } from '@ethersproject/providers';

import { FNDNFT721__factory } from 'types/contracts';

import { isAllTrue } from 'utils/helpers';
import { getNFTMarketAddress } from 'lib/addresses';
import useModal from 'hooks/use-modal';
import { ModalKey } from 'types/modal';

async function getApproval(variables: HasApprovalVariables) {
  const { provider, contractAddress, publicAddress } = variables;

  try {
    const erc721 = FNDNFT721__factory.connect(contractAddress, provider);
    const res = await erc721.isApprovedForAll(
      publicAddress,
      getNFTMarketAddress()
    );

    return res;
  } catch (err) {
    console.log({ err });
    return false;
  }
}

interface HasApprovalVariables {
  contractAddress: string;
  publicAddress: string;
  provider: BaseProvider;
}

type HasApprovalVariablesPicked = Pick<
  HasApprovalVariables,
  'publicAddress' | 'contractAddress'
>;

export default function useHasApproval(
  variables: HasApprovalVariablesPicked,
  options?: UseQueryOptions<boolean, Error>
) {
  const { contractAddress, publicAddress } = variables;

  const provider = useProvider();

  const isEnabled = isAllTrue([provider, contractAddress, publicAddress]);

  return useQuery(
    ['HasApproval', variables],
    () => getApproval({ provider, contractAddress, publicAddress }),
    { ...options, enabled: isEnabled }
  );
}

useHasApproval.getKey = (variables: HasApprovalVariablesPicked) => [
  'HasApproval',
  variables,
];

export function useApprovalModal(
  variables: HasApprovalVariablesPicked,
  options?: UseQueryOptions<boolean, Error>
) {
  const { contractAddress } = variables;

  const { setCurrentModal, setModalEntity } = useModal();

  useEffect(() => {
    if (contractAddress) {
      setModalEntity(contractAddress);
    }
  }, [contractAddress, setModalEntity]);

  return useHasApproval(variables, {
    ...options,
    onSuccess: (isApproved) => {
      if (!isApproved) {
        setCurrentModal(ModalKey.MARKET_APPROVAL);
      }
    },
  });
}

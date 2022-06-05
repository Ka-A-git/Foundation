import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { compose } from 'ramda';
import { useQueryClient } from 'react-query';

import Page from 'components/Page';
import Box from 'components/base/Box';
import Body from 'components/base/Body';
import { H1Heading } from 'components/base/Heading';
import Card from 'components/base/Card';
import Flex from 'components/base/Flex';
import Text from 'components/base/Text';
import Button from 'components/base/Button';
import SpinnerStroked from 'components/SpinnerStroked';
import TextLink from 'components/base/TextLink';
import Input from 'components/base/InputV2';

import { getFirstValue } from 'utils/helpers';

import { useCollectionValidity } from 'graphql/hasura/queries/collection-validity.generated';
import useImportCollectionCheck from 'hooks/queries/fnd-data/use-import-collection-check';
import useImportCollection from 'hooks/queries/fnd-data/use-import-collection';
import { useState } from 'react';

export default function CollectionAdminTools() {
  const router = useRouter();
  const [{ data: user }] = useAccount();
  const queryClient = useQueryClient();
  const [creatorAddress, setCreatorAddress] = useState('');
  const contractAddress = getFirstValue(router.query.addressOrSlug);
  const currentUserPublicKey = user?.address;
  const { data } = useCollectionValidity(
    {
      contractAddress,
    },
    {
      enabled: Boolean(contractAddress),
      refetchInterval: (collection) => {
        if (collection) {
          return false;
        }
        return 5000;
      },
    }
  );

  const { mutate: doImportCollectionCheck } = useImportCollectionCheck({
    onSuccess: () => {
      queryClient.invalidateQueries(
        useCollectionValidity.getKey({ contractAddress })
      );
    },
  });

  const { mutate: doImportCollection } = useImportCollection({
    onSuccess: () => {
      queryClient.invalidateQueries(
        useCollectionValidity.getKey({ contractAddress })
      );
    },
  });

  const collection = getFirstValue(data?.collectionValidation);
  const tokensSampledCount = data?.nftValidation.length;
  const failedCount = data?.nftValidation.filter(
    (n) => n.status !== 'SUCCESS'
  ).length;
  const validCount = data?.nftValidation.filter(
    (n) => n.status === 'SUCCESS'
  ).length;
  const validPercent = (validCount / tokensSampledCount) * 100;
  const nftChecksJson = JSON.stringify(data?.nftValidation, undefined, 2);
  const confidenceScore = compose(
    (prev: number) => (collection?.isErc721 ? prev + 25 : prev),
    (prev: number) => (collection?.hasRoyalties ? prev + 25 : prev),
    (prev: number) => (collection?.hasSingleOwner ? prev + 25 : prev),
    (prev: number) => (validPercent >= 75 ? prev + 25 : prev)
  )(0);

  const isInProgress = ['PROTOCOL_VALIDATING', 'NFTS_VALIDATING'].includes(
    collection?.status
  );

  const onRunCheck = () => {
    doImportCollectionCheck({
      contractAddress,
      adminPublicKey: currentUserPublicKey,
    });
  };

  const onImport = () => {
    doImportCollection({
      contractAddress,
      adminPublicKey: currentUserPublicKey,
      creatorAddress,
    });
  };

  return (
    <Page title="Collection Status">
      <Body css={{ display: 'flex', alignItems: 'center' }}>
        <Box css={{ width: 600, marginX: 'auto' }}>
          <H1Heading css={{ marginBottom: '$4' }}>Admin Tools</H1Heading>
          <Card
            css={{
              paddingX: '$6',
              paddingY: '$6',
              border: 'none',
              width: '100%',
              marginBottom: '$4',
            }}
          >
            <Flex css={{ alignItems: 'center' }}>
              <Text weight="semibold">Confidence Score</Text>
              <Box css={{ marginLeft: 'auto' }}>
                {isInProgress ? (
                  <Box>
                    <SpinnerStroked size={16} />
                  </Box>
                ) : collection ? (
                  <Text weight="semibold">{confidenceScore}/100</Text>
                ) : (
                  <Button
                    color="black"
                    size="small"
                    shape="round"
                    hoverable
                    onClick={onRunCheck}
                  >
                    Run Check
                  </Button>
                )}
              </Box>
            </Flex>
          </Card>

          {collection && (
            <Card
              css={{
                paddingX: '$6',
                paddingY: '$6',
                border: 'none',
                width: '100%',
                marginBottom: '$4',
              }}
            >
              <Flex css={{ alignItems: 'center' }}>
                <Box css={{ flexGrow: 1, paddingRight: '$6' }}>
                  <Text weight="semibold" css={{ marginBottom: '$4' }}>
                    Index on Foundation
                  </Text>
                  <Input
                    placeholder="Creator Address"
                    value={creatorAddress}
                    onChange={(e) => setCreatorAddress(e.target.value)}
                    css={{ width: '100%' }}
                  />
                </Box>
                <Box css={{ marginLeft: 'auto' }}>
                  <Button
                    color={creatorAddress.length === 0 ? 'gray' : 'black'}
                    size="small"
                    shape="round"
                    hoverable
                    onClick={onImport}
                    disabled={creatorAddress.length === 0}
                  >
                    Approve
                  </Button>
                </Box>
              </Flex>
            </Card>
          )}

          <Flex css={{ marginBottom: '$8', alignItems: 'center' }}>
            <TextLink
              href={`https://opensea.io/assets?search[query]=${contractAddress}&search[resultModel]=ASSETS`}
              target="_blank"
            >
              View on OpenSea
            </TextLink>

            {collection && !isInProgress && (
              <Button
                color="black"
                size="small"
                shape="round"
                hoverable
                onClick={onRunCheck}
                css={{ marginLeft: 'auto' }}
              >
                Run Check Again
              </Button>
            )}
          </Flex>

          <H1Heading css={{ marginBottom: '$4' }}>
            Collection Parameters
          </H1Heading>
          <Card
            css={{
              border: 'none',
              width: '100%',
              marginBottom: '$8',
            }}
          >
            <Flex
              css={{
                paddingX: '$6',
                paddingY: '$6',
                borderBottom: '1px solid $blackT10',
                alignItems: 'center',
              }}
            >
              <Text weight="semibold">ERC-721</Text>
              <Box css={{ marginLeft: 'auto' }}>
                {isInProgress ? (
                  <Box>
                    <SpinnerStroked size={16} />
                  </Box>
                ) : collection ? (
                  <BooleanLabel isTrue={collection?.isErc721} />
                ) : (
                  <Text weight="semibold">-</Text>
                )}
              </Box>
            </Flex>

            <Flex
              css={{
                paddingX: '$6',
                paddingY: '$6',
                borderBottom: '1px solid $blackT10',
                alignItems: 'center',
              }}
            >
              <Text weight="semibold">Royalties</Text>
              <Box css={{ marginLeft: 'auto' }}>
                {isInProgress ? (
                  <Box>
                    <SpinnerStroked size={16} />
                  </Box>
                ) : collection ? (
                  <BooleanLabel isTrue={collection?.hasRoyalties} />
                ) : (
                  <Text weight="semibold">-</Text>
                )}
              </Box>
            </Flex>
            <Flex
              css={{
                paddingX: '$6',
                paddingY: '$6',
                borderBottom: '1px solid $blackT10',
                alignItems: 'center',
              }}
            >
              <Text weight="semibold">Single Creator</Text>
              <Box css={{ marginLeft: 'auto' }}>
                {isInProgress ? (
                  <Box>
                    <SpinnerStroked size={16} />
                  </Box>
                ) : collection ? (
                  <BooleanLabel isTrue={collection?.hasSingleOwner} />
                ) : (
                  <Text weight="semibold">-</Text>
                )}
              </Box>
            </Flex>

            <Flex
              css={{
                paddingX: '$6',
                paddingY: '$6',
                borderBottom: '1px solid $blackT10',
                alignItems: 'center',
              }}
            >
              <Text weight="semibold">Total Tokens</Text>
              <Box css={{ marginLeft: 'auto' }}>
                {isInProgress ? (
                  <Box>
                    <SpinnerStroked size={16} />
                  </Box>
                ) : collection ? (
                  <Text weight="semibold">{collection?.totalTokenCount}</Text>
                ) : (
                  <Text weight="semibold">-</Text>
                )}
              </Box>
            </Flex>
          </Card>

          <H1Heading css={{ marginBottom: '$4' }}>Token Parameters</H1Heading>
          <Card
            css={{
              border: 'none',
              width: '100%',
              marginBottom: '$8',
            }}
          >
            <Flex
              css={{
                paddingX: '$6',
                paddingY: '$6',
                borderBottom: '1px solid $blackT10',
                alignItems: 'center',
              }}
            >
              <Text weight="semibold">No. tokens sampled</Text>
              <Box css={{ marginLeft: 'auto' }}>
                {isInProgress ? (
                  <Box>
                    <SpinnerStroked size={16} />
                  </Box>
                ) : collection ? (
                  <Text weight="semibold">{tokensSampledCount}</Text>
                ) : (
                  <Text weight="semibold">-</Text>
                )}
              </Box>
            </Flex>

            <Flex
              css={{
                paddingX: '$6',
                paddingY: '$6',
                borderBottom: '1px solid $blackT10',
                alignItems: 'center',
              }}
            >
              <Text weight="semibold">No. failed to fetch</Text>
              <Box css={{ marginLeft: 'auto' }}>
                {isInProgress ? (
                  <Box>
                    <SpinnerStroked size={16} />
                  </Box>
                ) : collection ? (
                  <Text weight="semibold">{failedCount}</Text>
                ) : (
                  <Text weight="semibold">-</Text>
                )}
              </Box>
            </Flex>

            <Flex
              css={{
                paddingX: '$6',
                paddingY: '$6',
                borderBottom: '1px solid $blackT10',
                alignItems: 'center',
              }}
            >
              <Text weight="semibold">No. valid assets</Text>
              <Box css={{ marginLeft: 'auto' }}>
                {isInProgress ? (
                  <Box>
                    <SpinnerStroked size={16} />
                  </Box>
                ) : collection ? (
                  <Text weight="semibold">{validCount}</Text>
                ) : (
                  <Text weight="semibold">-</Text>
                )}
              </Box>
            </Flex>

            <Flex
              css={{
                paddingX: '$6',
                paddingY: '$6',
                borderBottom: '1px solid $blackT10',
                alignItems: 'center',
              }}
            >
              <Text weight="semibold">Percent valid</Text>
              <Box css={{ marginLeft: 'auto' }}>
                {isInProgress ? (
                  <Box>
                    <SpinnerStroked size={16} />
                  </Box>
                ) : collection ? (
                  <Text
                    weight="semibold"
                    css={{
                      color:
                        Number.isNaN(validPercent) || validPercent < 25
                          ? '$red100'
                          : '$black100',
                    }}
                  >
                    {Number.isNaN(validPercent) ? 0 : validPercent}%
                  </Text>
                ) : (
                  <Text weight="semibold">-</Text>
                )}
              </Box>
            </Flex>
          </Card>

          <H1Heading css={{ marginBottom: '$4' }}>NFT checks</H1Heading>
          <Card css={{ padding: '$4', overflowX: 'scroll', maxHeight: 400 }}>
            <Text as="pre">{nftChecksJson}</Text>
          </Card>
        </Box>
      </Body>
    </Page>
  );
}

interface BooleanLabelProps {
  isTrue: boolean;
}

function BooleanLabel(props: BooleanLabelProps) {
  const { isTrue } = props;
  return (
    <Text weight="semibold" css={{ color: isTrue ? '$green100' : '$red100' }}>
      {isTrue ? 'True' : 'False'}
    </Text>
  );
}

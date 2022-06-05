import { always, cond, equals } from 'ramda';

import Box from 'components/base/Box';
import Grid from 'components/base/Grid';

import RefinementFilters from 'components/search/algolia/RefinementFilters';
import { AlgoliaUserSocialVerification, AlgoliaUserType } from 'types/Algolia';

const getUserTypeLabel = cond([
  [equals(AlgoliaUserType.CREATOR), always('Creator')],
  [equals(AlgoliaUserType.COLLECTOR), always('Collector')],
  [equals(AlgoliaUserType.OTHER), always('Other')],
]);

const getVerficationLabel = cond([
  [equals(AlgoliaUserSocialVerification.TWITTER), always('Twitter')],
  [equals(AlgoliaUserSocialVerification.INSTAGRAM), always('Instagram')],
  [equals(AlgoliaUserSocialVerification.NOT_VERIFIED), always('Not Verified')],
]);

export default function ProfileSearchFilters(): JSX.Element {
  return (
    <Box>
      <Grid>
        <RefinementFilters
          attribute="userTypeFacet"
          title="Type"
          sortOrder={['Creator', 'Collector', 'Other']}
          defaultRefinement={[AlgoliaUserType.CREATOR]}
          collapsed={false}
          transformItems={(items) => {
            return items.map((item) => ({
              ...item,
              label: getUserTypeLabel(item.label),
            }));
          }}
        />
        <RefinementFilters
          attribute="socialVerificationFacet"
          title="Social Verification"
          sortOrder={['Twitter', 'Instagram', 'Not Verified']}
          defaultRefinement={[
            AlgoliaUserSocialVerification.TWITTER,
            AlgoliaUserSocialVerification.INSTAGRAM,
          ]}
          collapsed={false}
          transformItems={(items) => {
            return items.map((item) => ({
              ...item,
              label: getVerficationLabel(item.label),
            }));
          }}
        />
      </Grid>
    </Box>
  );
}

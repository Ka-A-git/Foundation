import ArticleBlock from 'components/blog/ArticleBlock';
import Box from './base/Box';
import Flex from './base/Flex';
import Grid from './base/Grid';

import { getGridSpacingStyles } from 'utils/styles';

export function LatestArticles(props) {
  const { articles } = props;

  return (
    <Flex css={{ flexDirection: 'column', alignItems: 'center' }}>
      <Box>
        <ArticleGrid articles={articles} />
      </Box>
    </Flex>
  );
}

export function ArticleGrid(props) {
  const { articles } = props;

  return (
    <Grid
      css={{
        '@bp1': {
          gridTemplateColumns: 'repeat(3,1fr)',
        },
        ...getGridSpacingStyles('gap'),
      }}
    >
      {articles.map((article) => (
        <ArticleBlock article={article} key={article.title} />
      ))}
    </Grid>
  );
}

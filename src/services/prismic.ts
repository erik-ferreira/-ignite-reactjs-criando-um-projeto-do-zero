import * as prismic from '@prismicio/client';

export function getPrismicClient() {
  const prismicClient = prismic.createClient(
    'https://spacetreveling-erik.prismic.io/api/v2',
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  );

  return prismicClient;
}

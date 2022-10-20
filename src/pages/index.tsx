import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { CalendarBlank, User } from 'phosphor-react';

import { getPrismicClient } from '../services/prismic';

import Header from '../components/Header';

import { formatDate } from '../utils/masks';

import styles from './home.module.scss';
import commonStyles from '../styles/common.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | spacetreveling</title>
      </Head>

      <main>
        <div className={styles.contentPosts}>
          {postsPagination?.results?.map(article => (
            <Link href={`/post/${article.uid}`} key={article.uid}>
              <a>
                <strong>{article.data.title}</strong>
                <span>{article.data.subtitle}</span>

                <div className={styles.footerCard}>
                  <div>
                    <CalendarBlank size={20} color="#BBB" />
                    <span>{article.first_publication_date}</span>
                  </div>
                  <div>
                    <User size={20} color="#BBB" />
                    <span>{article.data.author}</span>
                  </div>
                </div>
              </a>
            </Link>
          ))}

          <button type="button" className={styles.buttonLoadMorePosts}>
            Carregar mais posts
          </button>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.getByType('posts', { pageSize: 1 });

  const posts: Post[] = response.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: formatDate(post.first_publication_date),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: response.next_page,
        results: posts,
      },
    },
  };
};

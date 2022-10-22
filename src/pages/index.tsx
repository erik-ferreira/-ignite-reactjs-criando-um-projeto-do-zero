import { useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { toast } from 'react-toastify';
import { CalendarBlank, User } from 'phosphor-react';

import { getPrismicClient } from '../services/prismic';
import { formatDate } from '../utils/masks';

import styles from './home.module.scss';

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
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPage, setNextPage] = useState<string | null>(
    postsPagination.next_page
  );

  async function handleLoadMorePosts() {
    try {
      const response = await fetch(nextPage);
      const data: PostPagination = await response.json();

      const updatedPosts: Post[] = data.results.map(post => ({
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title,
          author: post.data.author,
          subtitle: post.data.subtitle,
        },
      }));

      setPosts(prevState => [...prevState, ...updatedPosts]);
      setNextPage(data.next_page);
    } catch (err) {
      toast.warning('Não foi possível carregar mais posts.');
    }
  }

  return (
    <>
      <Head>
        <title>Home | spacetreveling</title>
      </Head>

      <main>
        <div className={styles.contentPosts}>
          {posts?.map(article => (
            <Link href={`/post/${article.uid}`} key={article.uid}>
              <a>
                <strong>{article.data.title}</strong>
                <span>{article.data.subtitle}</span>

                <div className={styles.footerCard}>
                  <div>
                    <CalendarBlank size={20} color="#BBB" />
                    <span>{formatDate(article.first_publication_date)}</span>
                  </div>
                  <div>
                    <User size={20} color="#BBB" />
                    <span>{article.data.author}</span>
                  </div>
                </div>
              </a>
            </Link>
          ))}

          {nextPage && (
            <button
              type="button"
              className={styles.buttonLoadMorePosts}
              onClick={handleLoadMorePosts}
            >
              Carregar mais posts
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.getByType('posts', { pageSize: 1 });

  return {
    props: {
      postsPagination: response,
    },
  };
};

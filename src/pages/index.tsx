import Head from 'next/head';
import { GetStaticProps } from 'next';
import { CalendarBlank, User } from 'phosphor-react';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';
import Link from 'next/link';

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

export default function Home() {
  // TODO

  const listArticles = [
    {
      id: 1,
      title: 'Como utilizar Hooks',
      description: 'Pensando em sincronização em vez de ciclos de vida.',
      date: '15 Mar 2021',
      author: 'Joseph Oliveira',
    },
    {
      id: 2,
      title: 'Criando um app CRA do zero',
      description:
        'Tudo sobre como criar a sua primeira aplicação utilizando Create React App',
      date: '19 Abr 2021',
      author: 'Danilo Vieira',
    },
    {
      id: 3,
      title: 'Como utilizar Hooks',
      description: 'Pensando em sincronização em vez de ciclos de vida.',
      date: '15 Mar 2021',
      author: 'Joseph Oliveira',
    },
  ];

  return (
    <>
      <Head>
        <title>Home | spacetreveling</title>
      </Head>

      <main>
        <div className={styles.contentPosts}>
          {listArticles.map(article => (
            <Link href="/post/lkansdlaknda" key={article.id}>
              <a>
                <strong>{article.title}</strong>
                <span>{article.description}</span>

                <div className={styles.footerCard}>
                  <div>
                    <CalendarBlank size={20} color="#BBB" />
                    <span>{article.date}</span>
                  </div>
                  <div>
                    <User size={20} color="#BBB" />
                    <span>{article.author}</span>
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

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };

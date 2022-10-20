import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { CalendarBlank, User, Clock } from 'phosphor-react';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  return (
    <>
      <Head>
        <title>Criando um app CRA do zero | spacetreveling</title>
      </Head>

      <main className={styles.containerPost}>
        <img src="/banner.png" alt="" />

        <div>
          <h1>Criando um app CRA do zero</h1>

          <div className={styles.info}>
            <div>
              <CalendarBlank size={20} color="#BBB" />
              <span>15 Mar 2021</span>
            </div>
            <div>
              <User size={20} color="#BBB" />
              <span>Joseph Oliveira</span>
            </div>
            <div>
              <Clock size={20} color="#BBB" />
              <span>4 min</span>
            </div>
          </div>

          <div className={styles.content}>
            <section>
              <h2>Proin et varius</h2>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

              <p>
                Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit
                tellus. Nam facilisis sodales felis, pharetra pharetra lectus
                auctor sed.
              </p>

              <p>
                Ut venenatis mauris vel libero pretium, et pretium ligula
                faucibus. Morbi nibh felis, elementum a posuere et, vulputate et
                erat. Nam venenatis.
              </p>
            </section>

            <section>
              <h2>Cras laoreet mi</h2>

              <p>
                Nulla auctor sit amet quam vitae commodo. Sed risus justo,
                vulputate quis neque eget, dictum sodales sem. In eget felis
                finibus, mattis magna a, efficitur ex. Curabitur vitae justo
                consequat sapien gravida auctor a non risus. Sed malesuada
                mauris nec orci congue, interdum efficitur urna dignissim.
                Vivamus cursus elit sem, vel facilisis nulla pretium
                consectetur. Nunc congue.
              </p>
              <p>
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Aliquam consectetur massa nec
                metus condimentum, sed tincidunt enim tincidunt. Vestibulum
                fringilla risus sit amet massa suscipit eleifend. Duis eget
                metus cursus, suscipit ante ac, iaculis est. Donec accumsan enim
                sit amet lorem placerat, eu dapibus ex porta. Etiam a est in leo
                pulvinar auctor. Praesent sed vestibulum elit, consectetur
                egestas libero.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType(TODO);

//   // TODO
// };

// export const getStaticProps = async ({params }) => {
//   const prismic = getPrismicClient({});
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };

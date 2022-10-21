import { AppProps } from 'next/app';
import { ToastContainer, toast } from 'react-toastify';

import Header from '../components/Header';

import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;

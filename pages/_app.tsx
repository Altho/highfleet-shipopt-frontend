import { GetServerSidePropsContext } from 'next';

import '../styles/global.css';
import { AppProps } from 'next/app';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
//import Amplify from 'aws-amplify'
// import config from '../src/aws-exports'
// Amplify.configure({
//   ...config,
//   ssr: true
// })

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title>Highfleet Ship Optimizer</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});

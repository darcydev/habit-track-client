import Head from 'next/head';

export default function PageHead({ pageTitle }) {
  return (
    <Head>
      <title>{pageTitle} | Habit Tracker</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}

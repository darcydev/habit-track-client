import Head from 'next/head';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { connectToDatabase } from '../util/mongodb';

export default function Home({ isConnected }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>
        {isConnected ? (
          <h1>Welcome to HabitTracker</h1>
        ) : (
          <h1>
            Warning: You are NOT connected to MongoDB. Check the <code>README.md</code> for instructions.
          </h1>
        )}
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}

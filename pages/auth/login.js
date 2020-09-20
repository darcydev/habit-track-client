import Head from 'next/head';
import styled from 'styled-components';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginForm from '../../components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div>
      <Head>
        <title>Login | HabitTracker</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>
        <StyledPage className='page-wrp'>
          <div className='content'>
            <h1 className='page-title'>Login</h1>
            <LoginForm />
          </div>
        </StyledPage>
      </main>
      <Footer />
    </div>
  );
}

const StyledPage = styled.div``;

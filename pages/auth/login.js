import styled from 'styled-components';

import PageHead from '../../components/Head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginForm from '../../components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div>
      <PageHead pageTitle='Login' />
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

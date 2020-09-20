import styled from 'styled-components';

import PageHead from '../../components/Head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RegisterForm from '../../components/forms/RegisterForm';

export default function RegisterPage() {
  return (
    <div>
      <PageHead pageTitle='Register' />
      <Header />
      <main>
        <StyledPage className='page-wrp'>
          <div className='content'>
            <h1 className='page-title'>Register</h1>
            <RegisterForm />
          </div>
        </StyledPage>
      </main>
      <Footer />
    </div>
  );
}

const StyledPage = styled.div``;

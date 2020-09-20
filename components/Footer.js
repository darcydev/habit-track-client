import { useContext } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';

import Context from '../context';

export default function Footer() {
  const [context, setContext] = useContext(Context);

  const handleLogout = () => {
    setContext((prev) => ({
      ...prev,
      token: undefined,
      userID: undefined,
    }));

    Router.push('/');
  };

  return (
    <StyledContainer>
      <div className='content'>
        <div className='logo-wrp'>
          <Link href='/'>
            <a>
              <img src='/images/logo.svg' alt='Logo' />
            </a>
          </Link>
        </div>
        <div className='nav-wrp'>
          <nav>
            <ul>
              {context.token && context.userID ? (
                <>
                  <li>
                    <Link href='/habits'>
                      <a>Habits</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/account'>
                      <a>Account</a>
                    </Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </>
              ) : (
                <li>
                  <Link href='/auth/login'>
                    <a>Login</a>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.footer`
  padding: 50px 25px;
  background: var(--main--blue--dark);
`;

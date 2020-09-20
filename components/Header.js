import { useContext, useState } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';

import Context from '../context';

export default function Header() {
  const [navOpen, setNavOpen] = useState(true);
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
          <button className='hamburger-btn' onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? (
              <img src='/images/icon--close.svg' alt='Nav menu close' />
            ) : (
              <img src='/images/icon--hamburger.svg' alt='Nav menu hamburger' />
            )}
          </button>
          {navOpen && (
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
          )}
        </div>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.header`
  padding: 50px 25px;
  background: var(--main--blue--dark);

  @media (max-width: 600px) {
    height: 350px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    height: 100%;

    .logo-wrp {
    }

    .nav-wrp {
      display: flex;
      align-items: center;

      .hamburger-btn {
        background: none;
        border: none;

        @media (min-width: 600px) {
          display: none;
        }

        img {
          width: 50px;
          height: auto;
        }
      }

      nav {
        ul {
          display: flex;
          justify-content: space-between;
          list-style: none;
          margin: 0;
          padding: 0;

          @media (max-width: 600px) {
            flex-direction: column;
          }

          li {
            margin: 0 30px;

            &:first-child {
              margin-left: 0;
            }

            &:last-child {
              margin-right: 0;
            }

            @media (max-width: 600px) {
              margin: 10px 0;

              &:first-child {
                margin-top: 0;
              }

              &:last-child {
                margin-bottom: 0;
              }
            }

            a {
              font-size: 20px;
              color: #fff;

              &:hover {
                color: yellow;
              }
            }
          }
        }
      }
    }
  }
`;

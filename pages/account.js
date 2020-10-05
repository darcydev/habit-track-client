import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import Context from '../context';

import PageHead from '../components/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Account() {
  const [accountDetails, setAccountDetails] = useState({});
  const [context, setContext] = useContext(Context);
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => {
    editUserDetails(data);
  };

  const fetchUserAccountDetails = () => {
    const requestBody = {
      userID: context.userID,
    };

    fetch('http://localhost:8000/api/user/', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => setAccountDetails(json))
      .catch((err) => console.error(err));
  };

  const editUserDetails = (formData) => {
    const requestBody = formData;

    console.log('requestBody :>> ', requestBody);

    fetch('http://localhost:8000/api/user/edit', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => setAccountDetails(json))
      .catch((err) => console.error(err));
  };

  /*
   ** TODO can I replace this with getStaticProps and/or getServerSideProps?
   */
  useEffect(() => {
    fetchUserAccountDetails();
  }, []);

  const { user } = accountDetails;

  return (
    <div>
      <PageHead pageTitle='Account' />
      <Header />
      <main>
        <StyledPage className='page-wrp'>
          <div className='content'>
            <h1 className='page-title'>Account</h1>

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
              <input
                name='email'
                type='text'
                defaultValue={user ? user.email : null}
                placeholder='Email'
                ref={register}
              />
              <input
                name='currentPassword'
                type='password'
                placeholder='Current password'
                ref={register({
                  required: { value: true, message: 'Current password required' },
                  minLength: { value: 6, message: 'Minimum 6 characters required' },
                })}
              />
              {errors.currentPassword && <span className='error-message'>{errors.currentPassword.message}</span>}
              <input
                name='newPassword'
                type='password'
                placeholder='New password'
                ref={register({
                  minLength: { value: 6, message: 'Minimum 6 characters required' },
                })}
              />
              {errors.newPassword && <span className='error-message'>{errors.newPassword.message}</span>}
              <input
                name='confirmPassword'
                type='password'
                placeholder='Confirm new password'
                ref={register({
                  validate: (value) => value === watch('newPassword'),
                  minLength: { value: 6, message: 'Minimum 6 characters required' },
                })}
              />
              {errors.confirmPassword && <span className='error-message'>{errors.confirmPassword.message}</span>}
              <button className='btn--main' type='submit'>
                Edit Profile
              </button>
            </StyledForm>
          </div>
        </StyledPage>
      </main>
      <Footer />
    </div>
  );
}

const StyledPage = styled.div``;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin: 20px 0;
    height: 50px;
    border: none;
    border-bottom: 1px solid #000;
    border-radius: 0;
    font-size: 22px;
    padding-left: 10px;
  }

  span.error-message {
    color: red;
  }

  .link-wrp {
    color: #565656;
    font-style: italic;
    margin: 0 0 0 auto;
  }
`;

import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import Context from '../../context';

export default function RegisterForm() {
  const [error, setError] = useState('');
  const [context, setContext] = useContext(Context);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const requestBody = {
      email: data.email,
      password: data.password,
    };

    const res = await fetch('http://localhost:8000/api/user/register', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res
      .json()
      .then((res) => {
        if (res.user && res.token) {
          setContext((prev) => ({
            ...prev,
            token: res.token,
            userID: res.user._id,
          }));
          Router.push('/');
        } else {
          setError(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder='Email'
        name='email'
        type='text'
        ref={register({ required: { value: true, message: 'Email required' } })}
      />
      {errors.email && <span className='error-message'>{errors.email.message}</span>}
      <input
        placeholder='Password'
        name='password'
        type='password'
        ref={register({
          required: { value: true, message: 'Password required' },
          minLength: { value: 6, message: 'Minimum 6 characters required' },
        })}
      />
      {errors.password && <span className='error-message'>{errors.password.message}</span>}
      {error && <span className='error-message'>{error}</span>}
      <input type='submit' className='btn submit' />
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: auto;

  input {
    margin: 20px 0;
    height: 50px;
    border: none;
    border-bottom: 1px solid #000;
    border-radius: 0;
    font-size: 22px;
    padding-left: 10px;
  }

  input.submit {
    cursor: pointer;
    width: 300px;
    background: var(--main--blue--dark);
    border: none;
    color: #fff;
    font-size: 25px;
    border-radius: 10px;

    &:hover {
      color: #000;
      background: lightblue;
    }
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

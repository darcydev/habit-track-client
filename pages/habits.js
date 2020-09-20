import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AiOutlinePlus } from 'react-icons/ai';

import Context from '../context';

import PageHead from '../components/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabitOpen, setNewHabitOpen] = useState(false);
  const [context, setContext] = useContext(Context);
  const [error, setError] = useState('');
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();

  /*
   ** FETCH USER'S HABITS
   ** TODO can I replace this with getStaticProps and/or getServerSideProps?
   */
  useEffect(() => {
    const requestBody = {
      userID: context.userID,
    };

    fetch('http://localhost:8000/api/habit/user', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => setHabits(json))
      .catch((err) => console.error(err));
  }, []);

  const handleCreateHabit = (data) => {
    const requestBody = {
      title: data.title,
      description: data.description,
      user: context.userID,
    };

    fetch('http://localhost:8000/api/habit/create', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
    })
      .then((res) => res.json())
      .then(() => router.reload())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <PageHead pageTitle='Home' />
      <Header />
      <main>
        <StyledPage className='page-wrp'>
          <div className='content'>
            <h1 className='page-title'>Habits</h1>

            {newHabitOpen ? (
              <StyledForm onSubmit={handleSubmit(handleCreateHabit)}>
                <input
                  placeholder='Title'
                  name='title'
                  type='text'
                  ref={register({ required: { value: true, message: 'Title required' } })}
                />
                {errors.title && <span className='error-message'>{errors.title.message}</span>}
                <input
                  placeholder='Description'
                  name='description'
                  type='text'
                  ref={register({ required: { value: true, message: 'Description required' } })}
                />
                {errors.description && <span className='error-message'>{errors.description.message}</span>}
                {error && <span className='error-message'>{error}</span>}
                <input className='btn--main' type='submit' />
              </StyledForm>
            ) : (
              <button className='btn--main' onClick={setNewHabitOpen(true)}>
                <AiOutlinePlus />
              </button>
            )}
            <h1>Your Habits</h1>
            <ul>
              {habits.length > 0 ? (
                habits.map((habit) => (
                  <li key={habit._id}>
                    <h2>{habit.title}</h2>
                    <h3>{habit.description}</h3>
                    <p>{habit.user}</p>
                  </li>
                ))
              ) : (
                <h2>No Habits yet</h2>
              )}
            </ul>
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

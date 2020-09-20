import { useState, useContext } from 'react';

import Context from '../context';
import { connectToDatabase } from '../util/mongodb';

export default function Habits({ habits }) {
  const [context, setContext] = useContext(Context);
  const [error, setError] = useState('');

  const handleCreateHabit = async () => {
    const requestBody = {
      title: 'Test from Frontend',
      description: 'Test',
      user: context.userID,
    };

    const res = await fetch('http://localhost:8000/api/habit/create', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
    });

    res
      .json()
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  return (
    <div>
      <button onClick={handleCreateHabit}>CREATE NEW HABIT</button>
      <h1>{error && <p>{error}</p>}</h1>
      <h1>20 Most Recent Habits</h1>
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            <h2>{habit.title}</h2>
            <h3>{habit.description}</h3>
            <p>{habit.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const habits = await db.collection('habits').find({}).limit(20).toArray();

  return {
    props: {
      habits: JSON.parse(JSON.stringify(habits)),
    },
  };
}

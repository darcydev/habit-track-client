import { connectToDatabase } from '../../util/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const habits = await db.collection('habits').find({}).limit(20).toArray();

  res.json(habits);
};

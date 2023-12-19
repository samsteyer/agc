import { sql } from '@vercel/postgres';

export default async function (req, res) {
  try {
    const data = await sql`SELECT * FROM homes`;
    res.status(200).json(data.rows[0]);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch dataset.',
      }
    });
    return;
  }
}

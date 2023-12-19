import { sql } from '@vercel/postgres';

export default async function (req, res) {
  try {
    const data = await sql`SELECT id, address FROM homes`;
    res.status(200).json(data.rows);
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


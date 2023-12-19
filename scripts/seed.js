const { db } = require('@vercel/postgres');
const { homes } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedHomes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "homes" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS homes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        country TEXT NOT NULL,
        zip TEXT NOT NULL,
        bedrooms DECIMAL,
        bathrooms DECIMAL,
        sqft INT,
        roof_area INT,
        heating TEXT,
        ac TEXT,
        year_built INT,
        last_remodel INT
      );
    `;

    console.log(`Created "homes" table`);

    // Insert data into the "homes" table
    const insertedHomes = await Promise.all(
      homes.map(
        (home) => client.sql`
        INSERT INTO homes (id, address, city, state, country, zip, bedrooms, bathrooms, sqft, roof_area, heating, ac, year_built, last_remodel)
        VALUES (${home.id}, ${home.address}, ${home.city}, ${home.state}, ${home.country}, ${home.zip}, ${home.bedrooms}, ${home.bathrooms}, ${home.sqft}, ${home.roof_area}, ${home.heating}, ${home.ac}, ${home.year_built}, ${home.last_remodel})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedHomes.length} homes`);

    return {
      createTable,
      homes: insertedHomes,
    };
  } catch (error) {
    console.error('Error seeding homes:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedHomes(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

const { db } = require('@vercel/postgres');
const { users, homes } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    const createUsersTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(
        (user) => client.sql`
        INSERT INTO users (id, email, first_name, last_name)
        VALUES (${user.id}, ${user.email}, ${user.first_name}, ${user.last_name})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedUsers.length} users`);
    return {
      createUsersTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}
async function seedHomes(client) {
  try {
    const createHomesTable = await client.sql`
      CREATE TABLE IF NOT EXISTS homes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
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
        INSERT INTO homes (id, user_id, address, city, state, country, zip, bedrooms, bathrooms, sqft, roof_area, heating, ac, year_built, last_remodel)
        VALUES (${home.id}, ${home.user_id}, ${home.address}, ${home.city}, ${home.state}, ${home.country}, ${home.zip}, ${home.bedrooms}, ${home.bathrooms}, ${home.sqft}, ${home.roof_area}, ${home.heating}, ${home.ac}, ${home.year_built}, ${home.last_remodel})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedHomes.length} homes`);

    return {
      createHomesTable,
      homes: insertedHomes,
    };
  } catch (error) {
    console.error('Error seeding homes:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedHomes(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

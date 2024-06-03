import { createDatabase } from 'db0';
import sqlite from 'db0/connectors/better-sqlite3';
import { drizzle } from 'db0/integrations/drizzle/index';
import { sqliteTable, text, numeric } from 'drizzle-orm/sqlite-core';

const table = sqliteTable('players', {
  name: text('name'),
  ratings_contact: numeric('ratings_contact'),
  ratings_power: numeric('ratings_contact'),
  ratings_gap: numeric('ratings_gap'),
});

// Initiate database with SQLite connector
const db = createDatabase(sqlite({}));
await db.sql`DROP TABLE IF EXISTS players`;
await db.sql`CREATE TABLE players (
  "name" text,
  "ratings_contact" integer, 
  "ratings_power" integer, 
  "ratings_gap" integer)`;
await db.sql`INSERT INTO players VALUES ("bob", 40, 60, 40)`;

const driz = drizzle(db);

const res = await driz
  .select({
    name: table.name,
    contact: table.ratings_contact,
    power: table.ratings_power,
    gap: table.ratings_gap,
  })
  .from(table);

console.log('res', res);

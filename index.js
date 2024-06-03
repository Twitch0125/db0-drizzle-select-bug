import { createDatabase } from "db0";
import sqlite from "db0/connectors/better-sqlite3";
import { drizzle as db0Drizzle } from "db0/integrations/drizzle/index";
import { sqliteTable, text, numeric } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/better-sqlite3";
const table = sqliteTable("players", {
  name: text("name"),
  ratings_contact: numeric("ratings_contact"),
  ratings_power: numeric("ratings_contact"),
  ratings_gap: numeric("ratings_gap"),
});
import SQLite from 'better-sqlite3'
// Initiate database with SQLite connector
const db = createDatabase(sqlite({}));
await db.sql`DROP TABLE IF EXISTS players`;
await db.sql`CREATE TABLE players (
  "name" text,
  "ratings_contact" integer, 
  "ratings_power" integer, 
  "ratings_gap" integer)`;
await db.sql`INSERT INTO players VALUES ('bob', 40, 60, 40)`;

const db0DrizzleClient = db0Drizzle(db);
const drizzleClient = drizzle(SQLite('.data/db.sqlite3'))

const db0res = await db0DrizzleClient
  .select({
    name: table.name,
    contact: table.ratings_contact,
    power: table.ratings_power,
    gap: table.ratings_gap,
  })
  .from(table);

console.log("db0res is wrong, should have 'contact', 'power', and 'gap' keys.", db0res);


const drizzleRes = await drizzleClient
  .select({
    name: table.name,
    contact: table.ratings_contact,
    power: table.ratings_power,
    gap: table.ratings_gap,
  })
  .from(table);
  console.log("drizzleRes is right and has 'contact', 'power', and 'gap' keys.", drizzleRes);
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS inventarios (
      producto_id INTEGER PRIMARY KEY,
      cantidad INTEGER NOT NULL
    )
  `);
});

export default db;

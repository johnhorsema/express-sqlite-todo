// Microservice - Todo
import sqlite3 from "sqlite3";
const db = new sqlite3.Database(':memory:');

var Todo = {
  init: () => {
    db.serialize(function() {
      db.run("CREATE TABLE todo (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, state TEXT)");
    });
  },
  dispatch: (action, payload) => {
    switch (action) {
      case "get":
        db.serialize(function() {
          db.all("SELECT id, content, state FROM todo", (err, rows) => {
            console.log(rows);
          });
        });
        break;
      case "add":
        db.serialize(function() {
          var query = db.prepare('INSERT INTO todo (content, state) VALUES (?, ?)')
          query.run(payload.content, "", (err) => {
            return this.lastID;
          });
        });
        break;
      case "remove":
        db.serialize(function() {
          db.run(`DELETE FROM todo WHERE id = ${payload.id}`, (err) => {
            return payload.id;
          });
        });
        break;
      case "done":
        db.serialize(function() {
          db.run("UPDATE todo SET state = ? WHERE id = ?", "done", payload.id);
        });
        break;
      case "reset":
        db.serialize(function() {
          db.run("UPDATE todo SET state = ? WHERE id = ?", "", payload.id);
        });
        break;
      default:
        throw new Error(`unknown action ${action}`);
    }
  }
}

export { Todo };
// Microservice - Todo
import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

var Todo = {
  init: () => {
    db.serialize(function() {
      db.run("CREATE TABLE todo (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, state TEXT)");
    });
  },
  dispatch: (action, payload) => {
    switch (action) {
      case "get":
        return new Promise((resolve, reject) => {
          db.serialize(function() {
            db.all("SELECT id, content, state FROM todo", (err, rows) => {
              if(err) reject(err);
              resolve(rows);
            });
          });
        });
        break;
      case "add":
        return new Promise((resolve, reject) => {
          db.serialize(function() {
            var query = db.prepare("INSERT INTO todo (content, state) VALUES (?, ?)")
            query.run(payload.content, "", (err) => {
              if(err) reject(err);
              resolve(this.lastID);
            });
          });
        });
        break;
      case "remove":
        return new Promise((resolve, reject) => {
          db.serialize(function() {
            db.run(`DELETE FROM todo WHERE id = ${payload.id}`, (err) => {
              if(err) reject(err);
              resolve(payload.id);
            });
          });
        });
        break;
      case "done":
        return new Promise((resolve, reject) => {
          db.serialize(function() {
            db.run("UPDATE todo SET state = ? WHERE id = ?", "done", payload.id, (err) => {
              if(err) reject(err);
              resolve(null);
            });
          });
        });
        break;
      case "reset":
        return new Promise((resolve, reject) => {
          db.serialize(function() {
            db.run("UPDATE todo SET state = ? WHERE id = ?", "", payload.id, (err) => {
              if(err) reject(err);
              resolve(null);
            });
          });
        });
        break;
      default:
        throw new Error(`unknown action ${action}`);
    }
  }
}

export { Todo };
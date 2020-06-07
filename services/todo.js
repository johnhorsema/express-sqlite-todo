// Microservice - Todo
import sqlite3 from "sqlite3";

export function Todo() {
  const db = sqlite3("test.db");

  return {
    init: () => {
      db.run("CREATE TABLE todo (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, state TEXT)")
    },
    dispatch: () => {
      switch (action, payload) {
        case "get_todos":
          db.all("SELECT id, content, state FROM todo", (err, rows) => {
            return rows
          })
        case "add_todo":
          var query = db.prepare('INSERT INTO todo (content, state) VALUES (?, ?)')
          query.run(payload.content, "", (err) => {
            return this.lastID
          })
        case "remove_todo":
          db.run(`DELETE FROM todo WHERE id = ${payload.id}`, (err) => {
            return payload.id
          })
        case "done_todo":
          db.run("UPDATE todo SET status = ? WHERE id = ?", "done", payload.id)
        case "reset_todo":
          db.run("UPDATE todo SET status = ? WHERE id = ?", "", payload.id)
        default:
          throw new Error(`unknown action ${action}`);
      }
    }
  }
  
}
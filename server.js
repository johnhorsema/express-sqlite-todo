import express from "express"
const app = express();
import { Todo } from "./services/todo";

app.use(express.static("public"));

app.get("/all", (request, response) => {
  Todo.dispatch("get", null, data => {
    response.json(data);
  });
});

app.get("/add/:content", (request, response) => {
  Todo.dispatch("add", {
    content: request.params.content || "Example Content"
  }, data => {
    response.send(`Added todo '${request.params.content}'.`);
  });
});

app.get("/remove/:id", (request, response) => {
  Todo.dispatch("remove", null, {
    id: request.params.id
  }, data => {
    response.send(`Removed todo '${request.params.id}'.`);
  });
});

app.get("/done/:id", (request, response) => {
  Todo.dispatch("done", {
    id: request.params.id
  }, data => {
    response.send(`Done todo '${request.params.id}'.`);
  });
});

const listener = app.listen(3000, () => {
  Todo.init();
  console.log("Your app is listening on port " + listener.address().port);
});

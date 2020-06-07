import express from "express"
const app = express();
import { Todo } from "./services/todo";

app.use(express.static("public"));

app.get("/all", async (request, response) => {
  var data = await Todo.dispatch("get")
  response.json(data)
});

app.get("/add/:content", async (request, response) => {
  var data = await Todo.dispatch("add", {
    content: request.params.content || "Example Content"
  });
  response.send(`Added todo '${request.params.content}'.`);
});

app.get("/remove/:id", async (request, response) => {
  var data = await Todo.dispatch("remove", {
    id: request.params.id
  })
  response.send(`Removed todo '${request.params.id}'.`);
});

app.get("/done/:id", async (request, response) => {
  var data = await Todo.dispatch("done", {
    id: request.params.id
  });
  response.send(`Done todo '${request.params.id}'.`);
});

const listener = app.listen(3000, () => {
  Todo.init();
  console.log("Your app is listening on port " + listener.address().port);
});

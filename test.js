import { Todo } from "./services/todo";

Todo.init()
Todo.dispatch("add", {
  content: "Code Flatend"
})
Todo.dispatch("add", {
  content: "Pitch"
})
Todo.dispatch("get")
Todo.dispatch("remove", {
  id: 1
})
Todo.dispatch("get")
Todo.dispatch("done", {
  id: 2
})
Todo.dispatch("get")
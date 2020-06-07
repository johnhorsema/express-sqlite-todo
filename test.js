import { Todo } from "./services/todo";

Todo.init()
Todo.dispatch("add", {
  content: "Code Flatend"
}, () => {})
Todo.dispatch("add", {
  content: "Pitch"
}, () => {})
Todo.dispatch("get", null, data => {
  console.log(data)
})
Todo.dispatch("remove", {
  id: 1
})
Todo.dispatch("get", null, data => {
  console.log(data)
})
Todo.dispatch("done", {
  id: 2
}, () => {})
Todo.dispatch("get")
import { useEffect, useState } from "react";
import "./index.css"
import { NewTodoForm } from "./newtodoform";
import { TodoList } from "./todolist";


export default function App() {
  const [newItem ,setnewItem] =useState("");
  const [todos, setTodos] = useState(() =>
  {
    const localValue =localStorage.getItem ("ITEM")
    if (localValue == null ) return []

      return JSON.parse(localValue)
  })

useEffect(() =>
{
  localStorage.setItem("ITEMS" , JSON.stringify(todos))
} , [todos])

  function addTodo(title) {
    setTodos((currentTodos )=> [
        ...currentTodos,
        {
          id: crypto.randomUUID(), title: title, completed: false
        },
      ]);
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo =>
        todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">To do List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}

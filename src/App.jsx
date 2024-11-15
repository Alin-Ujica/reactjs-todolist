import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {

  const [todos,setTodos] = useState([])
  const[todoValue,setTodoValue] = useState('')

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo] 
    setTodos(newTodoList)  
    persistData(newTodoList)
  }

  function persistData(newList){
    localStorage.setItem('todos',JSON.stringify({todos:newList}))
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex)=>{
      return todoIndex !== index
    })
    setTodos(newTodoList)
    persistData(newTodoList)
  }
  
  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
    persistData(newTodoList)
  }

  useEffect(()=> {
    if(!localStorage){
      return
    }
    let localTodos = localStorage.getItem('todos')
    if(!localTodos){
      return
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  },[])
  
  return (
      <main>
        <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}></TodoInput> 
        <TodoList todos={todos}  handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo}></TodoList>
      </main>
  )
}

export default App

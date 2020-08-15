import React, { useState, useCallback, useEffect } from 'react';
import './App.css'

const App = () => {
  const [newToDo, setNewToDo] = useState('');
  const [todos, setTodos] = useState([]);

  const todoChange = useCallback((e) => {
    console.log(e.target.value);
    setNewToDo(e.target.value);
  }, []);

  //* CallBack will run only when it's dependencies get changed
  const formSubmit = useCallback((e) => {
    //* prevent from refreshing the page
    e.preventDefault();
    setTodos([
      // spread todos
      ...todos,
      {
        id: todos.length + 1,
        content: newToDo,
        done: false
      }
    ]);
    setNewToDo(''); //! attempt to create a new todo with empty form
  }, [newToDo, todos]); //? on form submit, we will update newToDo so it will also chnage todos

  useEffect(() => {
    console.log('todos', todos);
  }, [todos]);  //? useEffect will only run it's function (console) only when it's dependencies (todos) has changed

  return (
    <React.Fragment>
      <div>
        <form onSubmit={formSubmit}>
          <label htmlFor="newtodo">Enter your new ToDo :</label>
          <br />
          <input id="newtodo" name="newtodo" value={newToDo} onChange={todoChange} />
          <button>Add a new ToDo</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li>{todo.content}</li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default App
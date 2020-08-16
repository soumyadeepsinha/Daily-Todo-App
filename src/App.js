import React, { useState, useCallback, useEffect } from 'react';
import './App.css'

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const todoChange = useCallback((e) => {
    setNewTodo(e.target.value);
  }, []);

  //* CallBack will run only when it's dependencies get changed
  const formSubmit = useCallback((e) => {
    //* prevent from refreshing the page
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([
      {
        id: todos.length ? todos[0].id + 1 : 1,
        content: newTodo,
        done: false
      },
      // spread todos
      ...todos
    ]);
    setNewTodo(''); //! attempt to create a new todo with empty form
  }, [newTodo, todos]); //? on form submit, we will update newToDo so it will also chnage todos

  useEffect(() => {
    console.log('todos', todos);
  }, [todos]);  //? useEffect will only run it's function (console) only when it's dependencies (todos) has changed

  const addTodos = useCallback((todo, index) => (e) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    });
    setTodos(newTodos);
  }, [todos]);    //* depending on todos

  const removeTodos = useCallback((todo) => (e) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos]);    //* depending on todos

  const markAlldone = useCallback(() => {
    // create a copy of the array
    // create a copy of each of the items
    // update the done property to be true on each of the new items
    // depending on todos
    const updatedTodos = todos.map(todo => {
      return {
        ...todo,
        done: true,
        className: todo.done,
      };
    });
    setTodos(updatedTodos);
  }, [todos]);

  return (
    <React.Fragment>
      <div>
        <form onSubmit={formSubmit}>
          <label htmlFor="newtodo">Enter your new ToDo :</label>
          <br />
          <input id="newtodo" name="newtodo" value={newTodo} onChange={todoChange} />
          <button>Add a new ToDo</button>
        </form>
        <button onClick={markAlldone}>Mark All Done</button>
        <ul>
          {todos.map((todo, index) => (
            <li key={todo.id}>
              <input type="checkbox"
                onChange={addTodos(todo, index)} />
              <span className={todo.done ? 'done' : ''}>{todo.content}</span>
              <button onClick={removeTodos(todo)}>Remove Todo</button>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default App
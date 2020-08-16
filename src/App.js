import React, { useState, useCallback, useEffect } from 'react';
import './App.css'

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const onTodochange = useCallback((e) => {
    setNewTodo(e.target.value);
  }, []);

  const formSubmit = useCallback((e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;   //* blank input isnt acceptable
    setTodos([
      {
        id: todos.length ? todos[0].id + 1 : 1,
        content: newTodo,
        done: false,
      },
      ...todos
    ]);
    setNewTodo('');     //* clear form when we add a todo
  }, [newTodo, todos]); //* on form submit, we will update newToDo so it will also chnage todos

  useEffect(() => {
    console.log('todos', todos);
  }, [todos]);          //* useEffect will only run when it's dependencies(todos) has changed

  const addTodo = useCallback((todo, index) => (e) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    });
    setTodos(newTodos);
  }, [todos]);

  const removeTodo = useCallback((todo) => (e) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos]);        //* depeding on todos

  const markAlldone = useCallback(() => {
    // create a copy of the array
    // create a copy of each of the items
    // update the done property to be true on each of the new items
    const updatedTodos = todos.map(todo => {
      return {
        ...todo,
        done: true,
      };
    });
    setTodos(updatedTodos);
  }, [todos]);       //* depeding on todos

  return (
    <div>
      <form onSubmit={formSubmit}>
        <label htmlFor="newTodo">Enter a Todo:</label>
        <input
          id="newTodo"
          name="newTodo"
          value={newTodo}
          onChange={onTodochange}
        />
        <button>Add Todo</button>
      </form>
      <button onClick={markAlldone}>Mark All Done</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              checked={todo.done}
              type="checkbox"
              onChange={addTodo(todo, index)}
            />
            <span className={todo.done ? 'done' : ''}>{todo.content}</span>
            <button onClick={removeTodo(todo)}>Remove Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

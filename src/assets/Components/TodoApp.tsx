import { useState } from "react";
import TodoList from "./TodoList";

export interface TodoI {
  title: string;
  id: number;
}

const TodoApp = () => {
  const [todo, setTodo] = useState<TodoI>({ title: "", id: 0 });
  const [todos, setTodos] = useState<TodoI[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ title: e.target.value, id: todo.id });
  };

  const onAdd = () => {
    if (todo.title.trim() === "") {
      //trim is a function used to remove whitespaces i.e. doesnt allow array to be filled empty
      alert("Enter something");
      return;
    }
    const id = Math.floor(Math.random() * 100);
    setTodos([...todos, { title: todo.title, id }]);
    setTodo({ title: "", id: 0 });
  };

  const onReset = () => {
    setTodos([]);
    setTodo({ title: "", id: 0 });
  };

  return (
    <div>
      <h1>ToDoList</h1>
      <input
        type="Text"
        placeholder="Enter your To Do List"
        value={todo.title}
        onChange={onChange}
      />
      <button className="btn1" onClick={onAdd}>
        Add
      </button>
      <button onClick={onReset} className="btn2">
        Reset
      </button>
      <TodoList todos={todos} />
    </div>
  );
};

export default TodoApp;

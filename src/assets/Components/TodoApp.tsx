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
    setTodo({ title: e.target.value, id: 0 });
  };
  const onAdd = (e: React.MouseEvent) => {
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
        onChange={onChange}
      ></input>
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

import { useEffect, useState } from "react";
import TodoList from "./TodoList";

export interface TodoI {
  title: string;
  id: number;
  timestamp: number;
  check: boolean;
}

const TodoApp = () => {
  const [todo, setTodo] = useState<TodoI>({
    title: "",
    id: 0,
    timestamp: 0,
    check: false,
  });
  const [todos, setTodos] = useState<TodoI[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      title: e.target.value,
      id: todo.id,
      timestamp: todo.timestamp,
      check: todo.check,
    });
  };

  const onAdd = () => {
    if (todo.title.trim() === "") {
      //trim is a function used to remove whitespaces i.e. doesnt allow array to be filled empty
      alert("Enter something");
      return;
    }
    const id = Math.floor(Math.random() * 100);
    const timestamp = Date.now();
    setTodos([...todos, { title: todo.title, id, timestamp, check: false }]);
    setTodo({ title: "", id: 0, timestamp, check: false });
  };

  const onCheckChange = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, check: !todo.check } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const nonDeleteTodos = todos.filter((todo) => todo.id !== id);
    setTodos(nonDeleteTodos);
  };

  const editTodo = (id: number, newTitle: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const onReset = () => {
    setTodos([]);
    setTodo({ title: "", id: 0, timestamp: 0, check: false });
  };

  return (
    <div className="w-100 bg-slate-600 max-w-400 p-2 ">
      <h1 className="text-white">ToDoList</h1>
      <div className="input-container bg-red-400 ">
        <input
          type="Text"
          placeholder="Enter your To Do List"
          value={todo.title}
          onChange={onChange}
        />
        <button className="btn1" onClick={onAdd}>
          Add
        </button>
      </div>
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        onCheckChange={onCheckChange}
      />
      <button onClick={onReset} className="btn2">
        Reset
      </button>
    </div>
  );
};

export default TodoApp;

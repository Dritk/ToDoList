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
    localStorage.removeItem("todos");
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
    localStorage.removeItem("todos");
    setTodo({ title: "", id: 0, timestamp: 0, check: false });
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-800 text-white py-10 px-4 sm:px-8 md:px-12 rounded-lg m">
      <h1 className="text-4xl font-extrabold text-center mb-6 font-mono text-orange-400">
        ToDo List
      </h1>
      <div className="flex items-center space-x-4 mb-6">
        <input
          className=" text-black w-full max-w-md p-4 rounded-lg border-2 border-gray-300 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8303] focus:border-[#FF8303] transition duration-200"
          type="text"
          placeholder="Enter your To-Do List"
          value={todo.title}
          onChange={onChange}
        />
        <button
          className="bg-[#FF8303] text-white rounded-full px-6 py-4 text-2xl font-bold hover:bg-[#cc6702] transition duration-200"
          onClick={onAdd}
        >
          +
        </button>
      </div>
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        onCheckChange={onCheckChange}
      />
      <div className="mt-8">
        <button
          onClick={onReset}
          className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-500 transition duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TodoApp;

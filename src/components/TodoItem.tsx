import { TodoI } from "./TodoApp";
import { useState } from "react";

interface TodoItemProps {
  todo: TodoI;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
  onCheckChange: (id: number) => void;
}

const TodoItem = ({
  todo,
  deleteTodo,
  editTodo,
  onCheckChange,
}: TodoItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    const newTitle = prompt("Edit your task", todo.title);
    if (newTitle && newTitle.trim() !== "") {
      editTodo(todo.id, newTitle);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTodo(todo.id);
    }, 500);
  };

  const timeStamp = new Date(todo.timestamp).toLocaleString();

  const taskStyle = todo.check
    ? { textDecoration: "line-through", color: "gray" }
    : {};

  return (
    <div
      className={`flex flex-col bg-gray-700 p-4 rounded-lg mb-4 shadow-md transition-opacity duration-500 ${
        isDeleting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="accent-orange-400"
            checked={todo.check}
            onChange={() => onCheckChange(todo.id)}
          />
          <span className="text-lg font-medium text-white" style={taskStyle}>
            {todo.title}
          </span>
        </div>

        <div className="ml-auto flex space-x-3">
          <button
            onClick={handleEdit}
            className="bg-[#FF8303] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#cc6702] transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-500 transition duration-200"
          >
            *
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-2">{timeStamp}</p>
    </div>
  );
};

export default TodoItem;

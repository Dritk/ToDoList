import { TodoI } from "./TodoApp";

interface TodoItemProps {
  todo: TodoI;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
  onCheckChange: (id: number) => void; // Add this prop
}

const TodoItem = ({
  todo,
  deleteTodo,
  editTodo,
  onCheckChange,
}: TodoItemProps) => {
  const handleEdit = () => {
    const newTitle = prompt("Edit your task", todo.title);
    if (newTitle && newTitle.trim() !== "") {
      editTodo(todo.id, newTitle);
    }
  };

  const timeStamp = new Date(todo.timestamp).toLocaleString();

  const taskStyle = todo.check
    ? { textDecoration: "line-through", color: "gray" }
    : {};

  return (
    <div className="">
      <div className="list">
        <input
          type="checkbox"
          checked={todo.check}
          onChange={() => onCheckChange(todo.id)}
        />
        <span style={taskStyle}>{todo.title}</span>
        <button onClick={handleEdit} className="btn3">
          Edit
        </button>
        <button onClick={() => deleteTodo(todo.id)} className="btn4">
          *
        </button>
      </div>
      <p>{timeStamp}</p>
    </div>
  );
};

export default TodoItem;

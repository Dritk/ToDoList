import TodoItem from "./TodoItem";
import { TodoI } from "./TodoApp";

interface TodoListProps {
  todos: TodoI[];
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
  onCheckChange: (id: number) => void;
}

const TodoList = ({
  todos,
  deleteTodo,
  editTodo,
  onCheckChange,
}: TodoListProps) => {
  return (
    <div className="div2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          onCheckChange={onCheckChange}
        />
      ))}
    </div>
  );
};

export default TodoList;

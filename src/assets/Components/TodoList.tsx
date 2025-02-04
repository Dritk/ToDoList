import { TodoI } from "./TodoApp";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: TodoI[];
}
const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;

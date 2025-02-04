import { TodoI } from "./TodoApp";

interface TodoItemProps {
  todo: TodoI;
}
const TodoItem = ({ todo }: TodoItemProps) => {
  return <div>{todo.title}</div>;
};

export default TodoItem;

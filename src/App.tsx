import TodoApp from "./components/TodoApp";
import "./index.css";
import Signup from "./login/Signup";

const App = () => {
  return (
    <div className="flex justify-center items-center min-h-screen  py-2.5 px-8 ">
      <TodoApp />
    </div>
  );
};

export default App;

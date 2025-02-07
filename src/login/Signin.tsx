import { useNavigate } from "react-router-dom";
import Form from "./FormComp";

const Signin = () => {
  const navigate = useNavigate();

  const auth = (email: string, password: string) => {
    const mockEmail = "hello@gmail.com";
    const mockPassword = "password123";

    if (email === mockEmail && password === mockPassword) return true;
    else return false;
  };

  const handleSignIn = (data: { email: string; password: string }) => {
    const { email, password } = data;

    if (auth(email, password)) {
      alert("Sign In successful!");
      navigate("/TodoApp");
    } else {
      alert("Invalid email or password! Please try again.");
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-8 flex items-center justify-center">
        <Form formType="signIn" onSubmit={handleSignIn} />
      </div>

      <div
        className="bg-img"
        style={{ backgroundImage: 'url("./rightbg.png")' }}
      ></div>
    </div>
  );
};

export default Signin;

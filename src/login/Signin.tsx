import { useNavigate } from "react-router-dom";
import Form from "./FormComp2";

const Signin = () => {
  const navigate = useNavigate();

  const handleSignIn = (data: { email: string; password: string }) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { email: savedEmail, password: savedPassword } =
        JSON.parse(storedUser);

      if (data.email === savedEmail && data.password === savedPassword) {
        navigate("/TodoApp");
      } else {
        alert("Invalid email or password! Please try again.");
      }
    } else {
      alert("Credentials don't match");
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

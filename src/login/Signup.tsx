import { useNavigate } from "react-router-dom";
import FormComp from "./FormComp2";

const Signup = () => {
  const navigate = useNavigate();
  const handleSignUp = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/signin");
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-8 flex items-center justify-center">
        <FormComp formType="signUp" onSubmit={handleSignUp} />
      </div>

      <div
        className="bg-img"
        style={{ backgroundImage: 'url("./rightbg.png")' }}
      ></div>
    </div>
  );
};

export default Signup;

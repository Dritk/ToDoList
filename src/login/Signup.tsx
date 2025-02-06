import FormComp from "./FormComp";

const Signup = () => {
  const handleSignUp = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    alert("Signup successful!");
    console.log(data);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-8 flex items-center justify-center">
        <FormComp formType="signUp" onSubmit={handleSignUp} />
      </div>

      <div
        className="w-1/2 p-8 flex bg-cover"
        style={{ backgroundImage: 'url("./rightbg.png")' }}
      ></div>
    </div>
  );
};

export default Signup;

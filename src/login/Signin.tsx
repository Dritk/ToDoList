import Form from "./FormComp";

const Signin = () => {
  const handleSignIn = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    alert("Sign In successful!");
    console.log(data);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-8 flex items-center justify-center">
        <Form formType="signIn" onSubmit={handleSignIn} />
      </div>

      <div
        className="w-1/2 p-8 flex bg-cover"
        style={{ backgroundImage: 'url("./rightbg.png")' }}
      ></div>
    </div>
  );
};

export default Signin;

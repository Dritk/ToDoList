import * as Yup from "yup";

const getValidationSchema = (formType: "signUp" | "signIn") => {
  return Yup.object().shape({
    name:
      formType === "signUp"
        ? Yup.string().required("Name is required")
        : Yup.string().notRequired(),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    termsAccepted:
      formType === "signUp"
        ? Yup.boolean().oneOf([true], "You must accept the terms")
        : Yup.boolean().notRequired(),
  });
};

export default getValidationSchema;

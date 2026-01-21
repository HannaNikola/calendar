"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { registerApi } from "../api/authApi";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { EyeClosed } from "lucide-react";
import { Eye } from "lucide-react";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export function SignupForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, status, error } = useSelector(
    (state: RootState) => state.auth
  );
  const [show, setShow] = useState(false);
  const isLoading = status === "loading";

  // useEffect(() => {
  //   if (isAuthenticated && status === "succeeded") {
  //     toast.success("Registration successful");
  //     // router.push("/calendar");
  //   }
  // }, [isAuthenticated, status, router]);

 useEffect(() => {
  if (status === "succeeded") {
    toast.success("Check your email to verify your account");
  }
}, [status]);

  return (
    <div className="flex flex-col w-[370px] h-[300px] items-center justify-center ">
      <h1 className="text-medium">Create your account</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          dispatch(registerApi(values));
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-full my-2 ">
            <div className="mb-6">
              <Field
                name="name"
                placeholder="Name"
                className=" w-full p-2 h-[40px] outline-none border-none rounded-md bg-input-form-main transition-all duration-200 ease-in-out focus:ring-1  focus:ring-input-form-ring hover:bg-input-form-hover shadow-sm"
              />
              {touched.name && errors.name && (
                <div className="text-red-500">{errors.name}</div>
              )}
            </div>

            <div className="mb-6">
              <Field
                name="email"
                placeholder="Email"
                className=" w-full p-2 h-[40px] outline-none border-none rounded-md bg-input-form-main transition-all duration-200 ease-in-out focus:ring-1  focus:ring-input-form-ring hover:bg-input-form-hover shadow-sm"
              />
              {touched.email && errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>

            <div className="mb-6 relative">
              <Field
                name="password"
                type={show ? "password" : "text"}
                placeholder="Password"
                className=" w-full p-2 h-[40px] outline-none border-none rounded-md bg-input-form-main transition-all duration-200 ease-in-out focus:ring-1  focus:ring-input-form-ring hover:bg-input-form-hover shadow-sm"
              />
              {touched.password && errors.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
              <span
                onClick={() => setShow(!show)}
                className="absolute  top-2 right-3 cursor-pointer select-none"
              >
                {show ? <EyeClosed /> : <Eye />}
              </span>
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-2 text-center">
                {error}
              </div>
            )}
            <button
              disabled={isLoading}
              type="submit"
              className={`w-full px-4 py-1 rounded-2xl shadow-sm
     hover:bg-navbar-button-hover
    text-main
    flex items-center justify-center gap-2
    disabled:opacity-60 disabled:cursor-not-allowed ${isLoading ? "bg-navbar-button-hover" : "bg-sky-100"}`}
            >
              {isLoading && (
                <span className="h-4 w-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
              )}
              <span>{isLoading ? "Sign up..." : "Sign up"}</span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default SignupForm;

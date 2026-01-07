"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../store/store";
import { loginApi } from "@/app/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, status } = useSelector(
    (state: RootState) => state.auth
  );
  const isLoading = status === "loading";

  useEffect(() => {
    if (isAuthenticated && status === "succeeded") {
      toast.success("Login successful");
      router.push("/calendar");
    }
  }, [isAuthenticated, status, router]);

  return (
    <div className="flex flex-col  w-[370px] h-[276px] items-center justify-center  ">
      <h1 className="text-medium">Sign in</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          dispatch(loginApi(values));
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-full mb-4 mt-8">
            <div className="mb-3 w-full">
              <Field
                name="email"
                placeholder="Email"
                className=" w-full p-2 h-[40px] outline-none border-none rounded-md bg-input-form-main transition-all duration-200 ease-in-out focus:ring-1 focus:ring-input-form-ring hover:bg-input-form-hover shadow-sm"
              />
              {touched.email && errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>

            <div className="mb-6">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className=" w-full p-2 h-[40px] outline-none border-none rounded-md bg-input-form-main transition-all duration-200 ease-in-out focus:ring-1  focus:ring-input-form-ring hover:bg-input-form-hover shadow-sm"
              />
              {touched.password && errors.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
            </div>
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
              <span>{isLoading ? "Logging in..." : "Login"}</span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default LoginForm;

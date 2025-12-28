"use client";
import { useRouter } from "next/navigation";
import { Button } from "../shared/ui/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../store/store";
import { loginApi } from "@/app/api/authApi";
import { useEffect } from "react";

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
  useEffect(() => {
    if (isAuthenticated && status === "succeeded") {
      router.push("/calendar");
    }
  }, [isAuthenticated, status, router]);

  return (
    <div className="w-[370px] p-2 ">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(loginApi(values));
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-full mb-4 mt-8">
            <div>
              <Field
                name="email"
                placeholder="Email"
                className="mb-3 w-full p-2 h-[40px] border-2 rounded-md"
              />
              {touched.email && errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="mb-3 w-full p-2 h-[40px] border-2 rounded-md"
              />
              {touched.password && errors.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-1 bg-grey-button hover:bg-gray-hover text-main  rounded-2xl  shadow-sm"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <div className="flex  justify-between ">
        <Button
          type="submit"
          onClick={() => router.push("/calendar")}
          variant="default"
        >
          Login
        </Button>
        <Button onClick={() => router.push("/")} variant="default">
          Back
        </Button>
      </div>
    </div>
  );
}
export default LoginForm;

import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import TextInputField from "components/shared/InputField/index";
import { login } from "actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "components/shared/Button/Button";
import { RootState } from "store";
import { getErrorMessage } from "helpers/errors";

interface Values {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, loginValues } = useSelector(
    (state: RootState) => state.auth
  );

  const initialValues = {
    email: loginValues?.email || "",
    password: loginValues?.password || ""
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required")
  });

  const handleLogin = (
    { email, password }: Values,
    actions: FormikHelpers<Values>
  ) => {
    dispatch(login(email, password));
    actions.resetForm({
      values: { email, password }
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleLogin(values, actions)}
      >
        {({ dirty }) => (
          <Form>
            <TextInputField
              name="email"
              placeholder="Email"
              error={error?.email?.msg}
            />
            <TextInputField
              name="password"
              type="password"
              placeholder="Password"
              error={error?.password?.msg}
            />
            <Button type="submit" loading={loading}>
              Login
            </Button>
            {!dirty && error && (
              <span className="submit-errors">{getErrorMessage(error)}</span>
            )}
          </Form>
        )}
      </Formik>
      <div className="switch-form">
        Don't have an account? <Link to="/auth/signup">Sign up</Link>
      </div>
    </>
  );
};

export default LoginForm;

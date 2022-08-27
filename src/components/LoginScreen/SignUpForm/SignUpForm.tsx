import React from "react";
import styled from "styled-components";
import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import TextInputField from "components/shared/InputField/index";
import { signUp } from "actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "components/shared/Button/Button";
import { RootState } from "store";
import { getErrorMessage } from "helpers/errors";

interface Values {
  email: string;
  name: string;
  password1: string;
  password2: string;
}

export enum PasswordStrength {
  STRONG = "STRONG",
  MEDIUM = "MEDIUM",
  WEAK = "WEAK",
  EMPTY = "EMPTY"
}

const PasswordInputField = styled(TextInputField)<{
  $passwordStrength: PasswordStrength;
}>`
  & .icon {
    color: ${({ $passwordStrength }) => {
      switch ($passwordStrength) {
        case PasswordStrength.STRONG:
          return "green";
        case PasswordStrength.MEDIUM:
          return "orange";
        case PasswordStrength.WEAK:
          return "red";
        case PasswordStrength.EMPTY:
          return "black";
        default:
          return "black";
      }
    }};
  }
`;

const strongPassword = new RegExp(
  "(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
const mediumPassword = new RegExp(
  "((?=.*[A-Z])|(?=.*[0-9])|(?=.*[^A-Za-z0-9]))(?=.{6,})"
);

const passwordTooltipMessage =
  "The password must have at least 6 characters and contain a special character, a number or an uppercase letter";

export const getPasswordStrength = (value?: string): PasswordStrength => {
  // "The password must have at least 6 characters and include one capital letter, number or special character";
  const isStrong = strongPassword.test(value || "");
  const isMedium = mediumPassword.test(value || "");
  if (isStrong) {
    return PasswordStrength.STRONG;
  } else if (isMedium) {
    return PasswordStrength.MEDIUM;
  } else if (value) {
    return PasswordStrength.WEAK;
  }
  return PasswordStrength.EMPTY;
};

const SignUpForm: React.FC = () => {
  const { loading, signUpValues, error } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const getIcon = (passwordStrength: PasswordStrength): string => {
    if (passwordStrength === PasswordStrength.EMPTY) {
      return "info";
    }
    if (passwordStrength === PasswordStrength.WEAK) {
      return "cancel";
    }
    return "check_circle";
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
    name: yup.string().required("Username is required"),
    password1: yup
      .string()
      .required("Password is required")
      .test(
        "is-safe",
        "The password is not safe",
        value => getPasswordStrength(value) !== PasswordStrength.WEAK
      ),
    password2: yup.string().required("Password is required")
  });

  const initialValues2 = {
    email: signUpValues?.email || "",
    name: signUpValues?.name || "",
    password1: signUpValues?.password || "",
    password2: signUpValues?.password || ""
  };

  const handleSignUp = (
    { email, name, password1, password2 }: Values,
    actions: FormikHelpers<Values>
  ) => {
    dispatch(signUp(email, name, password1));
    actions.resetForm({
      values: { email, name, password1, password2 }
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues2}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleSignUp(values, actions)}
      >
        {({ dirty, isValid, values }) => {
          const passwordStrength = getPasswordStrength(values.password1);
          return (
            <Form>
              <TextInputField
                name="email"
                placeholder="Email"
                error={error?.email?.msg}
              />
              <TextInputField
                name="name"
                placeholder="Username"
                error={error?.name?.msg}
              />
              <PasswordInputField
                name="password1"
                placeholder="Password"
                type="password"
                error={error?.password?.msg}
                icon={getIcon(passwordStrength)}
                iconTooltipText={passwordTooltipMessage}
                $passwordStrength={passwordStrength}
              />
              <TextInputField
                name="password2"
                placeholder="Repeat password"
                type="password"
              />
              <Button
                type="submit"
                loading={loading}
                disabled={!dirty || !isValid}
              >
                Sign Up
              </Button>
              {!dirty && error && (
                <span className="submit-errors">{getErrorMessage(error)}</span>
              )}
            </Form>
          );
        }}
      </Formik>
      <div className="switch-form">
        Have an account? <Link to="/auth/login">Log in</Link>
      </div>
    </>
  );
};

export default SignUpForm;

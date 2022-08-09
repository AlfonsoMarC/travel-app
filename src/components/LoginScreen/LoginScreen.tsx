import React from "react";
import styled from "styled-components";
import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import SignUpForm from "./SignUpForm/SignUpForm";

const StyledLoginScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  margin-top: 0;
  margin-bottom: 0;
  ${({ theme }) => theme.media.atLarge} {
    height: auto;
    align-self: center;
    width: fit-content;
  }

  ${({ theme }) => theme.media.atSmall} {
    margin-top: auto;
    margin-bottom: auto;
    gap: ${({ theme }) => theme.spacing.space5};
  }
`;

const StyledLoginImageContainer = styled.div`
  display: none;
  width: 380px;
  height: 440px;
  background: grey;
  ${({ theme }) => theme.media.atLarge} {
    display: flex;
  }
`;

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.space5};
  height: 100%;
  ${({ theme }) => theme.media.atSmall} {
    width: 380px;
    height: 440px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  }
  ${({ theme }) => theme.media.atLarge} {
    padding: ${({ theme }) => theme.spacing.space10};
  }
  h1 {
    display: flex;
    justify-content: center;
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.spacing.space10};
    color: blue;
    ${({ theme }) => theme.media.atSmall} {
      margin-bottom: ${({ theme }) => theme.spacing.space5};
    }
  }
  form {
    display: flex;
    flex-direction: column;
    > button {
      margin-top: ${({ theme }) => theme.spacing.space3};
    }
  }
  .switch-form {
    margin-top: auto;
    span {
      color: blue;
      cursor: pointer;
    }
  }
  .submit-errors {
    display: flex;
    justify-content: center;
    color: red;
    margin-top: ${({ theme }) => theme.spacing.space6};
  }
`;

const LoginScreen: React.FC = () => {
  return (
    <StyledLoginScreenContainer>
      <StyledLoginImageContainer />
      <StyledFormContainer>
        <h1>TravelApp</h1>
        <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="*" element={<Navigate to="login" replace />} />
        </Routes>
        <Outlet />
      </StyledFormContainer>
    </StyledLoginScreenContainer>
  );
};

export default LoginScreen;

import React from "react";
import styled from "styled-components";
import { Field, FieldProps } from "formik";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-bottom: ${({ theme }) => theme.spacing.space2}; */

  .field-with-icon {
    display: flex;
    flex-direction: row;
  }
  input {
    &,
    &:focus {
      display: flex;
      flex: 1;
      border: none;
      outline: none;
      border-bottom: 1px solid black;
      background: transparent;
    }
  }
  .icon-container {
    border-bottom: 1px solid black;
  }
  .icon {
    font-family: "Material Icons";
    font-size: 16px;
    cursor: pointer;
  }
  .text-input-error-container {
    height: 20px;
  }
  .text-input-error {
    margin-top: ${({ theme }) => theme.spacing.halfSpace};
    font-size: 12px;
    text-align: end;
    color: red;
  }
`;

interface Props {
  className?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  icon?: string;
}

const TextInputField: React.FC<Props> = ({
  className,
  name,
  placeholder,
  type,
  autoComplete,
  error,
  icon
}) => {
  return (
    <Field name={name}>
      {({ field, meta, form }: FieldProps) => (
        <StyledContainer className={className}>
          <div className="field-with-icon">
            <input
              placeholder={placeholder}
              type={type || "text"}
              autoComplete={autoComplete ? "on" : "off"}
              {...field}
            />
            <div className="icon-container">
              <span className="icon">{icon}</span>
            </div>
          </div>
          <div className="text-input-error-container">
            {!error && meta.touched && meta.error && (
              <div className="text-input-error">{meta.error}</div>
            )}
            {!form.dirty && error && (
              <div className="text-input-error">{error}</div>
            )}
          </div>
        </StyledContainer>
      )}
    </Field>
  );
};

export default TextInputField;

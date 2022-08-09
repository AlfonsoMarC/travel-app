import React from "react";
import styled from "styled-components";
import { Field, FieldProps } from "formik";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: ${({ theme }) => theme.spacing.space3};

  textarea {
    display: flex;
    height: calc(100% - 24px);
    border: 1px solid black;
    resize: none;
    outline: none;
    }
  }
  .textarea-error {
    margin-top: ${({ theme }) => theme.spacing.halfSpace};
    font-size: 12px;
    color: red;
    text-align: end;
  }
`;

interface Props {
  className?: string;
  name?: string;
  placeholder?: string;
}

const TextareaField: React.FC<Props> = ({ className, name, placeholder }) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <StyledContainer className={className}>
          <textarea placeholder={placeholder} {...field} />
          {meta.error && <div className="textarea-error">{meta.error}</div>}
        </StyledContainer>
      )}
    </Field>
  );
};

export default TextareaField;

import React from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

const StyledSelect = styled(Form.Select)`
  border: 1px solid ${({ theme }) => theme.color.primary200};
  cursor: pointer;
  &:focus {
    border: 1px solid ${({ theme }) => theme.color.primary200};
  }
`;

export type Option = {
  value: any;
  label: string;
} | null;

interface Props {
  options: Option[];
  selectedOption: Option;
  onChangeOption: (option: Option) => void;
  className?: string;
}

const Select: React.FC<Props> = ({
  options,
  selectedOption = null,
  onChangeOption,
  className
}) => {
  const onChange = (event: any) => {
    const newSelectedOption =
      options.find(option => option?.value === event.target.value) ?? null;
    onChangeOption(newSelectedOption);
  };
  return (
    <StyledSelect
      value={selectedOption?.value}
      onChange={onChange}
      className={`${className} selectpicker`}
    >
      {options.map(option => (
        <option
          className="select-option"
          key={option?.value}
          value={option?.value}
        >
          {option?.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;

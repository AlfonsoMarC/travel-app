import React from "react";
import Form from "react-bootstrap/Form";

export type Option = {
  value: any;
  label: string;
} | null;

interface Props {
  options: Option[];
  selectedOption: Option;
  onChangeOption: (option: Option) => void;
}

const Select: React.FC<Props> = ({
  options,
  selectedOption = null,
  onChangeOption
}) => {
  const onChange = (event: any) => {
    const newSelectedOption =
      options.find(option => option?.value === event.target.value) ?? null;
    onChangeOption(newSelectedOption);
  };
  return (
    <Form.Select value={selectedOption?.value} onChange={onChange}>
      {options.map(option => (
        <option key={option?.value} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default Select;

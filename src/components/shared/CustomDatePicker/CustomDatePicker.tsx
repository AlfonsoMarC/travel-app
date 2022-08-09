import React, { useEffect } from "react";
import styled from "styled-components";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { format, parse } from "date-fns";
import { Field, FieldProps, useFormikContext } from "formik";
import { labelS } from "assets/mixins";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 74px;
  margin-bottom: ${({ theme }) => theme.spacing.space2};

  .title-label {
    ${labelS};
  }

  .DayPickerInput {
    > input {
      text-align: center;
      width: 100px;
      &: focus {
        outline: none;
      }
    }
  }
  .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    position: relative;
    background-color: transparent !important;
    &:hover {
      &::before {
        content: "";
        position: absolute;
        content: "";
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        top: 0.25em;
        left: 0;
        z-index: -1;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.color.primary50};
      }
    }
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: transparent;
    &:hover {
      color: ${({ theme }) => theme.color.primary500};
    }
    &::before {
      content: "";
      position: absolute;
      content: "";
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      top: 0.25em;
      left: 0;
      z-index: -1;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.color.primary500};
    }
  }
  .error {
    margin-top: ${({ theme }) => theme.spacing.halfSpace};
    font-size: 12px;
    color: red;
  }
`;
interface Props {
  className?: string;
  title?: string;
  name: string;
  value: Date;
  disableBeforeDate?: Date;
}

const CustomDatePicker: React.FC<Props> = ({
  className,
  title,
  name,
  value,
  disableBeforeDate
}) => {
  const formatDate = (date: number | Date, dateFormat: string) =>
    format(date, dateFormat);

  const parseDate = (stringDate: string, format: string, locale: any) => {
    const dateRegExp = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}");
    if (dateRegExp.test(stringDate)) {
      const parsedDate = parse(stringDate, format, new Date(), { locale });
      return DateUtils.isDate(parsedDate) ? parsedDate : undefined;
    }
    return undefined;
  };

  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (value && disableBeforeDate && value < disableBeforeDate) {
      setFieldValue(name, disableBeforeDate);
    }
  }, [disableBeforeDate, setFieldValue, name, value]);

  const FORMAT = "dd/MM/yyyy";

  const customModifiers =
    disableBeforeDate && DateUtils.isDate(disableBeforeDate)
      ? { disabled: { before: disableBeforeDate } }
      : {};

  return (
    <StyledContainer className={`CustomDatePicker ${className}`}>
      <label className="title-label">{title}</label>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue }, meta }: FieldProps) => {
          const handleDayChange = (day: Date) => {
            setFieldValue(name, day);
          };

          return (
            <div>
              <DayPickerInput
                onDayChange={day => handleDayChange(day)}
                formatDate={formatDate}
                format={FORMAT}
                parseDate={parseDate}
                placeholder={FORMAT}
                value={value}
                dayPickerProps={{
                  firstDayOfWeek: 1,
                  modifiers: customModifiers,
                  selectedDays: value,
                  initialMonth: value
                }}
              />
              {meta.error && <div className="error">{meta.error}</div>}
            </div>
          );
        }}
      </Field>
    </StyledContainer>
  );
};

export default CustomDatePicker;

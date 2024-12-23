import React from "react";

export type SelectOption = {
  key: string;
  name: string;
  value: any;
};

type Props = {
  value: any;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: SelectOption[];
};

const Select = ({ value, onChange, options, ...props }: Props) => {
  return (
    <select value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option key={option.key} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;

import React from "react";

import "./form-input.styles.scss";

interface InputPropsInterface {
  label?: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  name?: string;
  required?: boolean;
}

const FormInput = (otherProps: InputPropsInterface) => {
  const { label } = otherProps;
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value?.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;

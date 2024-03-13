import React from "react";

const Input = ({
  required,
  name,
  label,
  value,
  type,
  error,
  onChange,
  showValidationIcon,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        <span>{required && "*"}</span>
      </label>

      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type={type}
        className="form-control"
      />

      {error && showValidationIcon && (
        <div className="field-status bg-color">
          <i className="fas fa-times close"></i>
        </div>
      )}

      {value && !error && showValidationIcon && (
        <div className="field-status bg-color">
          <i className="fas fa-check check"></i>
        </div>
      )}

      {value && error && (
        <>
          <div className="field-status bg-color">
            <i className="fas fa-times close"></i>
          </div>
          <div className="attention-text">
            <span>{error}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Input;

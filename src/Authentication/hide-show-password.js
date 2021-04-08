import { useState } from "react";

export const InputPasswordField = ({
  value,
  onChangeHandler,
  placeholderText
}) => {
  const [isHidden, setHidePassword] = useState(true);

  return (
    <label className="input-with-eye-container">
      <input
        className="form-field"
        value={value}
        placeholder={placeholderText}
        type={isHidden ? "password" : "text"}
        onChange={onChangeHandler}
      />
      <button
        type="button"
        className="btn btn-icon-secondary eye-container"
        onClick={() => {
          setHidePassword((flag) => !flag);
        }}
      >
        <i
          className={
            isHidden ? "fas fa-eye-slash btn-icon" : "fas fa-eye btn-icon"
          }
        ></i>
      </button>
    </label>
  );
};

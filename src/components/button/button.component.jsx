import React from "react";
import "./button.styles.scss";

/*
 Wee have three buttons
- Default Button
- Inverted Button
- Google sign in button
*/
const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

function Button({children, buttonType, ...otherProps}) {
  return (
    <button
      className={`button ${
        BUTTON_TYPE_CLASSES[buttonType]
          ? BUTTON_TYPE_CLASSES[buttonType]
          : buttonType
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;

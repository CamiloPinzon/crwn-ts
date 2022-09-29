import React, { MouseEventHandler } from "react";

import "./button.styles.scss";

interface ButtonProps {
  children: React.ReactNode,
  type?: 'submit' | 'reset' | 'button' | undefined,
  buttonType?: 'google' | 'inverted', 
  onClickAction?: MouseEventHandler<HTMLButtonElement> | undefined,
}

const Button = ({ children, type, buttonType, onClickAction } : ButtonProps) => {
  return <button className={`button-container ${buttonType}`} type={type} onClick={onClickAction}>{children}</button>;
};

export default Button;

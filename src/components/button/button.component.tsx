import React, { MouseEventHandler } from "react";

import "./button.styles.scss";

interface ButtonProps {
  children: React.ReactNode,
  type?: 'submit' | 'reset' | 'button' | undefined,
  buttonType?: 'google' | 'inverted', 
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined,
}

const Button: React.FC<ButtonProps> = ({ children, type, buttonType, onClick }) => {
  return <button className={`button-container ${buttonType}`} type={type} onClick={onClick}>{children}</button>;
};

export default Button;

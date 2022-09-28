import React from "react";

import "./button.styles.scss";

interface ButtonProps {
  children: React.ReactNode,
  type?: 'submit' | 'reset' | 'button' | undefined,
  buttonType?: 'google' | 'inverted', 
}

const Button = ({ children, type, buttonType } : ButtonProps) => {
  return <button className={`button-container ${buttonType}`} type={type} >{children}</button>;
};

export default Button;

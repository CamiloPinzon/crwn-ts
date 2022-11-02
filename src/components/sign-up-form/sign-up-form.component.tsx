import React, { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { GlobalUserContext } from "../../context/user.context";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const { setCurrentUser } = useContext(GlobalUserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleUserCreate = async () => {
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, {displayName: displayName});
      setCurrentUser(await signInAuthUserWithEmailAndPassword(email, password));
      resetFormFields();
    } catch (error) {
      error instanceof Error
        ? alert(`Error creating user: ${error.message}`)
        : alert(`Unexpected error: ${error}`);
    }
  };

  const resetFormFields = (): void => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    password === confirmPassword
      ? handleUserCreate()
      : alert("Passwords do not match");
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name"
          type="text"
          value={displayName}
          onChange={handleChange}
          name="displayName"
          required
        />

        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={handleChange}
          name="email"
          required
        />

        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={handleChange}
          name="password"
          required
        />

        <FormInput
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;

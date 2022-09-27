import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleUserCreate = async () => {
    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(response, { displayName });
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
    <>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display name</label>
        <input
          type="text"
          value={displayName}
          onChange={handleChange}
          name="displayName"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          name="email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={handleChange}
          name="password"
          required
        />

        <label>Confirm password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUpForm;

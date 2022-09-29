import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { ErrorData } from "@firebase/util";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    e?.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case "Firebase: Error (auth/user-not-found).":
            alert("User not found");
            break;
          case "Firebase: Error (auth/wrong-password).":
            alert("Please check your info");
            break;
          default:
            alert("Something it´s going wrong, please try again later.");
            break;
        }
      }
    }
    resetFormFields();
  };

  const signInWithGoogle = async (): Promise<void> => {
    const response = await signInWithGooglePopup();
    await createUserDocumentFromAuth(response);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType={"google"} onClickAction={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

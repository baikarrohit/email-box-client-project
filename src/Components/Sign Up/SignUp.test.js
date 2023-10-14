import React from "react";
import { render, screen} from "@testing-library/react";
import SignUp from "./SignUp";

test("renders SignUp component", () => {
  render(<SignUp />);
  const signUpTitle = screen.getByText('Sign Up');
  expect(signUpTitle).toBeInTheDocument();
});
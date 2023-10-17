import { render, screen } from "@testing-library/react";
import Login from "./Login";

test("renders Login component", () => {
  render(<Login />);

  const loginEle = screen.findByText("Don't have an account? Sign Up");
  expect(loginEle).toBeInTheDocument();
});

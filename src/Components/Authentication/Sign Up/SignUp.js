import { Form, Button } from "react-bootstrap";
import classes from "./signup.module.css";
import { useRef } from "react";


const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Password do not match! please type again.");
      return;
    }
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhK417KOq-Ge3i57PLz3IHTLU27y4X51o",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        console.log("User has successfully signed up.");
        emailRef.current.value = "";
        passwordRef.current.value = "";
        confirmPasswordRef.current.value = "";
      } else {
        console.log("Authentication Failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <section className={classes.container}>
        <h2>Sign Up</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group id="email" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              ref={emailRef}
              required
            />
          </Form.Group>

          <Form.Group id="password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              ref={passwordRef}
              required
            />
          </Form.Group>

          <Form.Group id="confirmPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              ref={confirmPasswordRef}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
      </section>
      {/* <section className={classes.lowersec}>
        <Link to="/login">Have an account? Login</Link>
      </section> */}
    </div>
  );
};

export default SignUp;

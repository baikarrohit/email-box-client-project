import { useRef, useState } from "react";
import classes from "./Login.module.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../../Store/auth-slice";
import { inboxItemFill } from "../../../Store/inbox-slice";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [error,setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhK417KOq-Ge3i57PLz3IHTLU27y4X51o",
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
      const data = await res.json();
      if (res.ok) {
        navigate("/profile", { replace: true });
        dispatch(AuthActions.login({tokenId: data.idToken, email: data.email}))
        dispatch(inboxItemFill(data.email))
        console.log("Login Done");
      } else {
        //console.log("Authentication Failed! Please try again.");
        setError(true)
        setTimeout(()=>{
          setError(false)
        },2000)
        
      }
      
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <section className={classes.container}>
        <h2>Login</h2>
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

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        {error && <p className={classes.error}>Authentication failed... Please try again.</p>}
      </section>
      
      {/* <section className={classes.lowersec}>
        <Link to="/">Don't have an account? Sign Up</Link>
      </section> */}
    </div>
  );
};

export default Login;

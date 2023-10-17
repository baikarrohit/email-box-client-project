import { useState } from "react";
import Login from "./Login/Login";
import SignUp from "./Sign Up/SignUp";
import classes from './Authentication.module.css';
import { Button } from "react-bootstrap";

const Authentication = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const switchModeHandler = () => {
    setIsLoginVisible(!isLoginVisible)
  }
  return (
    <section>
      {!isLoginVisible && <SignUp />}
      {isLoginVisible && <Login />}
      <div className={classes.switchBtn}>
        <p>
          {!isLoginVisible
            ? "Already Have An Account?"
            : "Create A New Account."}
          <Button variant="link" onClick={switchModeHandler}>
            {!isLoginVisible ? "Log In" : "Sign Up"}
          </Button>
        </p>
      </div>
    </section>
  );
};

export default Authentication;

import { Button, Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { AuthActions } from "../../Store/auth-slice";
import { inboxActions } from "../../Store/inbox-slice";
import { SentEmailActions } from "../../Store/sentEmail-slice";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(inboxActions.onLogoutInboxNull())
    dispatch(SentEmailActions.onLogoutSentmailNull())
    dispatch(AuthActions.logout());
    navigate("/", { replace: true });
  };
  return (
    <Navbar className={classes["bg-body-tertiary"]}>
      <Container>
        <Navbar.Brand href="#home" className={classes.brand}>
          Gmail
        </Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end"> 
          {auth.isLoggedIn && <Navbar.Text>
            Signed in as : <a href='/profile'>{auth.userEmail.split('@')[0]}</a>
          </Navbar.Text>}
        </Navbar.Collapse>

        {auth.isLoggedIn && <Button
          variant="warning"
          style={{ marginLeft: "1rem" }}
          onClick={logoutHandler}
        >
          Logout
        </Button>}
      </Container>
    </Navbar>
  );
};

export default Header;

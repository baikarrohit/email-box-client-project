import { Button, Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { AuthActions } from "../../Store/auth-slice";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(AuthActions.logout());
    navigate("/", { replace: true });
  };
  return (
    <Navbar className={classes["bg-body-tertiary"]}>
      <Container>
        <Navbar.Brand href="#home" className={classes.brand}>
          Metro Mail
        </Navbar.Brand>
        <Navbar.Toggle />

        {/* <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as : <a href="#login">{auth.userEmail}</a>
          </Navbar.Text>
        </Navbar.Collapse>

        <Button
          variant="warning"
          style={{ marginLeft: "1rem" }}
          onClick={logoutHandler}
        >
          Logout
        </Button> */}
      </Container>
    </Navbar>
  );
};

export default Header;

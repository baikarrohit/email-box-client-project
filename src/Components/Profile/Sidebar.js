import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { inboxActions } from "../../Store/inbox-slice";
import classes from './sidebar.module.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const inboxItem = useSelector((state) => state.inbox);
  const dispatch = useDispatch();

  const composeHandler = () => {
    navigate("/profile/compose", { replace: true });
  };
  const inboxHandler = async () => {
    navigate("/profile/inbox", { replace: true });
    const email = auth.userEmail.replace(/[.@]/g, "");
    console.log(email);
    try {
      const resInbox = await fetch(
        `https://email-box-fb572-default-rtdb.firebaseio.com/${email}/sentemails.json`
      );
      const data = await resInbox.json();
      console.log(Object.values(data));
      if (resInbox.ok) {
        dispatch(inboxActions.addItem(Object.values(data)));
      } else {
        console.log("inbox authenticattion failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <div className={classes.mailCon}>
        <table>
          <tr>
            <td>
              <Button variant="primary" onClick={composeHandler}>
                Compose
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="outline-secondary" onClick={inboxHandler}>
                Inbox
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="outline-success">Sent</Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="outline-warning">Outbox</Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="outline-info">Starred</Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="outline-danger">Spam</Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="outline-info">Recycle Bin</Button>
            </td>
          </tr>
        </table>
      </div>
    </Fragment>
  );
};

export default Sidebar;

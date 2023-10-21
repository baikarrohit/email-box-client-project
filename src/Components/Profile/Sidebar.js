import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { inboxItemFill } from "../../Store/inbox-slice";
import classes from "./sidebar.module.css";
import { SentEmailItemFill } from "../../Store/sentEmail-slice";

const Sidebar = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const inboxItems = useSelector((state) => state.inbox.inboxItems);

  const composeHandler = () => {
    navigate("/profile/compose", { replace: true });
  };
  const inboxHandler = async () => {
    navigate("/profile/inbox", { replace: true });

    dispatch(inboxItemFill(auth.userEmail));
  };

  const sentemailHandler = () => {
    navigate("/profile/sentemail", { replace: true });
    dispatch(SentEmailItemFill(auth.userEmail));
  };

  let totalUnread = 0;
  inboxItems.forEach((ele) => {
    if (ele[1].unread) {
      totalUnread++;
    }
  });
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
                Inbox<p style={{ color: "red" }}>unread {totalUnread}</p>
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="outline-success" onClick={sentemailHandler}>
                Sent
              </Button>
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

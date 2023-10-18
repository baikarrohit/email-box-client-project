import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import classes from "./inbox.module.css";
import { useNavigate } from "react-router-dom";
import { inboxActions } from "../../Store/inbox-slice";
import { GoDotFill, GoDot } from "react-icons/go";
import { MdDelete } from "react-icons/md";

const Inbox = () => {
  const inboxItem = useSelector((state) => state.inbox.inboxItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const clickEmailHandler = async (item) => {
    navigate("/profile/inbox/message", { replace: true });
    dispatch(inboxActions.addMessageOpen(item));
    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      const resEmail = await fetch(
        `https://email-box-fb572-default-rtdb.firebaseio.com/${email}/recievedemails/${item[0]}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: item[1].id,
            from: item[1].from,
            emailSub: item[1].emailSub,
            emailContent: item[1].emailContent,
            date: item[1].date,
            unread: false,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(resEmail.json());
    } catch (err) {
      console.log(err);
    }
  };

  const clickDeleteHandler = async (deleteItem) => {
    dispatch(inboxActions.removeItem(deleteItem));
    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      await fetch(
        `https://email-box-fb572-default-rtdb.firebaseio.com/${email}/recievedemails/${deleteItem[0]}.json`,
        { method: "DELETE" }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className={classes.inboxCon}>
      <h3>Inbox</h3>
      <Table striped hover>
        <thead>
          <tr>
            <th>Status</th>
            <th>Subject</th>
            <th>Sender</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {inboxItem.map((i) => (
            <tr
              onClick={() => clickEmailHandler(i)}
              className={i[1].unread ? classes.unreadRow : ""}
              key={i[0]}
            >
              <td>
                {i[1].unread ? (
                  <GoDotFill style={{ color: "blue" }} />
                ) : (
                  <GoDot />
                )}
              </td>
              <td>{i[1].emailSub}</td>
              <td>{i[1].from}</td>
              <td>{i[1].date}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clickDeleteHandler(i);
                  }}
                >
                  <MdDelete style={{ color: "red", border: "black" }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default Inbox;

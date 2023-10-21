import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SentEmailActions } from "../../Store/sentEmail-slice";

const SentEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const sentemailItem = useSelector((state) => state.sentemail.sentemailItem);

  const clickEmailHandler = async (item) => {
    navigate("/profile/sentemail/message", { replace: true });
    dispatch(SentEmailActions.addMessageOpen(item));
  };

  const clickDeleteHandler = async (deleteItem) => {
    dispatch(SentEmailActions.removeItem(deleteItem));
    const email = auth.userEmail.replace(/[.@]/g, "");
    try {
      await fetch(
        `https://email-box-fb572-default-rtdb.firebaseio.com/${email}/sentemails/${deleteItem[0]}.json`,
        { method: "DELETE" }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <h3>Sent Email</h3>
      <Table>
        <thead>
          <tr>
            <th>Reciver</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sentemailItem.map((i) => (
            <tr onClick={() => clickEmailHandler(i)} key={i[0]}>
              <td>To: {i[1].to}</td>
              <td>{i[1].emailSub}</td>
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

export default SentEmail;

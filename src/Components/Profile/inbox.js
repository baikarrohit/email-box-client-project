import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from './inbox.module.css';

const Inbox = () => {
  const inboxItem = useSelector((state) => state.inbox.inboxItems);

  return (
    <section className={classes.inboxCon}>
      <h3>Inbox</h3>
      <Table striped hover>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Email Content</th>
            <th>Sender</th>
          </tr>
        </thead>
        <tbody>
          {inboxItem.map((i) => (
            <tr>
              <td>{i.emailSub}</td>
              <td>{i.emailContent}</td>
              <td>{i.to}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default Inbox;

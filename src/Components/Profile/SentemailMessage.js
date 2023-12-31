import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import classes from './SentemailMessage.module.css';

const SentemailMessage = () => {
  const messageOpen = useSelector((state) => state.sentemail.sentMessageOpen);
  return (
    <section className={classes.messageCon}> 
      <h1>{messageOpen.emailSub}</h1>
      <section className={classes.msgMain}>
        <div className={classes.msgContent}>
          <span className={classes.info}>
            <BsPersonCircle className={classes.infopic}/>
            <p>{messageOpen.to}</p>
          </span>
          <span>{messageOpen.date}</span>
        </div>
        <div
          className={classes.messageBox}
          dangerouslySetInnerHTML={{ __html: messageOpen.emailContent }}
        />
      </section>
    </section>
  );
};

export default SentemailMessage;

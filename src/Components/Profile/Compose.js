import { Form, Button } from "react-bootstrap";
import { convertToHTML } from "draft-convert";
import { InputGroup } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import classes from "./compose.module.css";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const Compose = () => {
  const sendToEmailInputRef = useRef();
  const subInputRef = useRef();
  const formRef = useRef();
  const [editorState, updateEditorState] = useState(EditorState.createEmpty());
  const auth = useSelector((state) => state.auth);
  const [emptyEmail, setEmptyEmail] = useState();
  const [successfullySentmail, setSuccessfullySentmail] = useState(false);

  const sendEmailHandler = async (event) => {
    event.preventDefault();
    if (sendToEmailInputRef.current.value === "") {
      setEmptyEmail("*Please enter recipient email");
      setTimeout(() => {
        setEmptyEmail(null);
      }, 1000);
      return;
    }
    const emailObj = {
      id: Math.random().toString(),
      to: sendToEmailInputRef.current.value,
      emailSub: subInputRef.current.value,
      emailContent: convertToHTML(editorState.getCurrentContent()),
      date: new Date(),
    };

    try {
      const senderEmail = auth.userEmail.replace(/[.@]/g, "");
      const res = await fetch(
        `https://email-box-fb572-default-rtdb.firebaseio.com/${senderEmail}/sentemails.json`,
        {
          method: "POST",
          body: JSON.stringify({
            ...emailObj,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("Email sent successfully.");
      } else {
        console.log("Email sending failed!");
      }
      setSuccessfullySentmail(true);
    } catch (err) {
      console.log(err);
    }
    const emailObj2 = {
      id: Math.random().toString(),
      from: auth.userEmail,
      emailSub: subInputRef.current.value,
      emailContent: convertToHTML(editorState.getCurrentContent()),
      date: new Date(),
      unread: true,
    };
    try {
      const recivedEmail = sendToEmailInputRef.current.value.replace(
        /[.@]/g,
        ""
      );
      const res = await fetch(
        `https://email-box-fb572-default-rtdb.firebaseio.com/${recivedEmail}/recievedemails.json`,
        {
          method: "POST",
          body: JSON.stringify({
            ...emailObj2,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(res.ok){
        console.log("Recieved email successfully")
      }else{
        console.log("failed to recieve mail")
      }
    } catch (err) {
      console.log(err);
    }
    formRef.current.reset();
    updateEditorState("");
    setTimeout(() => {
      setSuccessfullySentmail(false);
    }, 5000);
  };
  return (
    <section className={classes.form}>
      {successfullySentmail && (
        <p style={{ color: "green" }}>successfully sent mail.</p>
      )}
      <h1>Welcome to Metro mail</h1>
      <Form ref={formRef} onSubmit={sendEmailHandler}>
        <p style={{ color: "red" }}>{emptyEmail}</p>
        <InputGroup className={classes.mail}>
          <InputGroup.Text id="btnGroupAddon">To</InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Enter recipient email"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
            ref={sendToEmailInputRef}
            className={emptyEmail ? classes.invalid : ""}
          />
          <InputGroup.Text id="btnGroupAddon">
            <Button className={classes.ccBtn}>CC/BCC</Button>
          </InputGroup.Text>
        </InputGroup>
        <InputGroup className={classes.subject}>
          <InputGroup.Text id="btnGroupAddon">Subject</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Enter email subject"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
            ref={subInputRef}
          />
        </InputGroup>
        <Form.Group controlId="composeEmailMessage" className={classes.editor}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={updateEditorState}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send Email
        </Button>
      </Form>
    </section>
  );
};

export default Compose;

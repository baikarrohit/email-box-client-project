import { Form, Button } from "react-bootstrap";
import { convertToHTML } from "draft-convert";
import { InputGroup } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from "draft-js";
import classes from "./compose.module.css"
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const Compose = () => {
  const sendToEmailInputRef = useRef();
  const subInputRef = useRef();
  const formRef = useRef();
  const [editorState, updateEditorState] = useState(EditorState.createEmpty());
  const auth = useSelector((state) => state.auth);

  const sendEmailHandler = async (event) => {
    event.preventDefault();
    const emailObj = {
      to: sendToEmailInputRef.current.value,
      emailSub: subInputRef.current.value,
      emailContent: convertToHTML(editorState.getCurrentContent()),
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
    } catch (err) {
      console.log(err);
    }
    formRef.current.reset();
    updateEditorState("");
  };
  return (
    <section className={classes.form}>
      <h1>Welcome to Metro mail</h1>
      <Form onSubmit={sendEmailHandler} ref={formRef}>
        <InputGroup className={classes.mail}>
          <InputGroup.Text id="btnGroupAddon">To</InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Enter recipient email"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
            ref={sendToEmailInputRef}
          />
          <Button variant="primary" type="submit">
            Send Email
          </Button>
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
      </Form>
    </section>
  );
};

export default Compose;

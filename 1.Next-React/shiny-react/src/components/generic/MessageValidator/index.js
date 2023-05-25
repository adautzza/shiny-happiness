import { useState } from "react";
import "./index.css";

const MessageValidator = () => {
  const [message, setMessage] = useState("");
  const messageEventHandler = (event) => {
    setMessage(event.target.value);
  };
  const messageResult = message.trim().length < 3 ? "Invalid message" : "Valid message";

  return (
    <form>
      <label>Your message</label>
      <input type="text" onChange={messageEventHandler} />
      <p>{messageResult}</p>
    </form>
  );
};

export default MessageValidator;

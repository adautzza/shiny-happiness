import React, { useState } from "react";
import "./styles.css";

const MessageValidator = () => {
  const [counterValue, setCounterValue] = useState(0);

  function incrementCounterHandler() {
    setCounterValue((prevCounter) => prevCounter + 1);
  }

  return (
    <div>
      <p id="counter">{counterValue}</p>
      <button onClick={incrementCounterHandler}>Increment</button>
    </div>
  );
};

export default MessageValidator;

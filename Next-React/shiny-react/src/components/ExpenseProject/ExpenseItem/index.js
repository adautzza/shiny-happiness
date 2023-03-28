import { useState } from "react";
import "./index.css";
import ExpenseDate from "../ExpenseDate";
import Card from "../../generic/Card";

const ExpenseItem = (props) => {
  const [title, setTitle] = useState(props.title);

  const clickHandler = () => setTitle("title");

  return (
    <>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{title}</h2>
          <div className="expense-item__price">${props.amount}</div>
          <button onClick={clickHandler}>Change!</button>
        </div>
      </Card>
    </>
  );
};

export default ExpenseItem;

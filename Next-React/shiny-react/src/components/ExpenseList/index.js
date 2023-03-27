import "./index.css";
import { ExpenseItem } from "../../components";

function ExpenseList(props) {
  return (
    <div className="expenses">
      {props.expenses.map((expense) => (
        <ExpenseItem title={expense.title} amount={expense.amount} date={expense.date}></ExpenseItem>
      ))}
    </div>
  );
}

export default ExpenseList;

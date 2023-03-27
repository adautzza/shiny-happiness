import "./index.css";
import { ExpenseItem } from "../../components";
import Card from "../Card";

function ExpenseList(props) {
  return (
    <Card className="expenses">
      {props.expenses.map((expense) => (
        <ExpenseItem title={expense.title} amount={expense.amount} date={expense.date} key={expense.id}></ExpenseItem>
      ))}
    </Card>
  );
}

export default ExpenseList;

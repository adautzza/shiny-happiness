import "./index.css";
import Card from "../../generic/Card";
import ExpenseItem from "../ExpenseItem";

const ExpenseList = (props) => {
  return (
    <>
      <ExpenseItem />
      <Card className="expenses">
        {props.expenses.map((expense) => (
          <ExpenseItem title={expense.title} amount={expense.amount} date={expense.date} key={expense.id}></ExpenseItem>
        ))}
      </Card>
    </>
  );
};

export default ExpenseList;

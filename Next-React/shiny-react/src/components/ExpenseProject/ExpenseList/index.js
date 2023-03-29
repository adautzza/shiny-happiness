import "./index.css";
import Card from "../../generic/Card";
import { ExpenseFilter, ExpenseItem } from "..";

const ExpenseList = (props) => {
  return (
    <>
      <Card className="expense-filter">
        <ExpenseFilter />
      </Card>
      <Card className="expenses">
        {props.expenses.map((expense) => (
          <ExpenseItem title={expense.title} amount={expense.amount} date={expense.date} key={expense.id}></ExpenseItem>
        ))}
      </Card>
    </>
  );
};

export default ExpenseList;

import { useState } from "react";
import "./index.css";
import Card from "../../generic/Card";
import { ExpenseFilter, ExpenseItem } from "..";

const ExpenseList = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const saveExpenseYearFilter = (selectedYear) => {
    setFilteredYear(selectedYear);
    console.log(selectedYear);
  };

  let filteredArray =
    filteredYear === "All" ? props.expenses : props.expenses.filter((el) => el.date.getFullYear().toString() === filteredYear.toString());

  return (
    <>
      <Card className="expense-filter">
        <ExpenseFilter onSelectExpenseYear={saveExpenseYearFilter} selectedYear={filteredYear} />
      </Card>

      <Card className="expenses">
        {filteredArray.map((expense) => (
          <ExpenseItem title={expense.title} amount={expense.amount} date={expense.date} key={expense.id}></ExpenseItem>
        ))}
        {!filteredArray.length && <div className="no-expense-notice">No expenses in this period</div>}
      </Card>
    </>
  );
};

export default ExpenseList;

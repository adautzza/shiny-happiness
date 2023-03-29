import React, { Component } from "react";
import "./index.css";
import { ExpenseList, NewExpense } from "../../components/ExpenseProject";

const expenses = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const addExpenseHanlder = (expense) => {
  expenses.push(expense);
  console.log(expenses);
  console.log(expense);
};

class BalanceCheckPage extends Component {
  render() {
    return (
      <>
        <h1>Here'where the money goes!</h1>
        <NewExpense onAddExpense={addExpenseHanlder}></NewExpense>
        <ExpenseList expenses={expenses}></ExpenseList>
      </>
    );
  }
}

export default BalanceCheckPage;

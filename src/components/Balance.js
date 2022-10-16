import React from "react";
import { useSelector } from "react-redux";
import numberWithCommas from "../utils/numberWithCommas";

function Balance() {
  const { transactions } = useSelector((state) => state.transaction);

  const calculateIncome = (transactions) => {
    let balance = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        balance += transaction.amount;
      }
      if (transaction.type === "expense") {
        balance -= transaction.amount;
      }
    });
    return balance;
  };
  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>
        <span>{numberWithCommas(calculateIncome(transactions))}</span>
      </h3>
    </div>
  );
}

export default Balance;

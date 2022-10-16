import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTransaction,
  createTransaction,
  editDeactive,
} from "../features/transaction/transactionSlice";

function Form() {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  const { error } = useSelector((state) => state.transaction);
  const { editing } = useSelector((state) => state.transaction);

  const resetForm = () => {
    setName("");
    setAmount("");
    setType("");
  };

  useEffect(() => {
    const { id, name, type, amount } = editing;

    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditMode(false);
      resetForm();
    }
  }, [editing]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(createTransaction({ name, amount: Number(amount), type }));
    resetForm();
  };

  const handleEdit = (e) => {
    e.preventDefault();

    dispatch(
      changeTransaction({
        id: editing?.id,
        data: {
          name,
          amount: Number(amount),
          type,
        },
      })
    );
    setEditMode(false);
    resetForm();
  };

  const cancelEdit = () => {
    dispatch(editDeactive());
    setEditMode(false);
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleEdit : handleAdd}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            name="transaction_name"
            placeholder="My Salary"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="transaction_type"
              checked={type === "income"}
              onChange={(e) => setType("income")}
              required
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="transaction_type"
              placeholder="Expense"
              onChange={(e) => setType("expense")}
              checked={type === "expense"}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="number"
            placeholder="300"
            name="transaction_amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
        </div>

        <button className="btn">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
        {error && (
          <p className="error">There was an error adding transaction</p>
        )}
      </form>

      {editMode && (
        <button className="btn cancel_edit" onClick={cancelEdit}>
          Cancel Edit
        </button>
      )}
    </div>
  );
}

export default Form;

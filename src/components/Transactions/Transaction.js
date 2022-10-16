import React from "react";
import editImg from "../../assets/images/edit.svg";
import deleteImg from "../../assets/images/delete.svg";
import { useDispatch } from "react-redux";
import {
  editActive,
  removeTransaction,
} from "../../features/transaction/transactionSlice";
import numberWithCommas from "../../utils/numberWithCommas";

function Transaction({ transaction }) {
  const { id, name, amount, type } = transaction;
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {numberWithCommas(amount)}</p>
        <button className="link" onClick={handleEdit}>
          <img className="icon" src={editImg} alt="Edit" />
        </button>
        <button className="link" onClick={handleDelete}>
          <img className="icon" src={deleteImg} alt="Delete" />
        </button>
      </div>
    </li>
  );
}

export default Transaction;

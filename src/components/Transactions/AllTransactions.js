import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Balance from "../Balance";
import Form from "../Form";
import Layout from "../Layout";
import Transaction from "./Transaction";

const AllTransactions = () => {
  const [edit, setEdit] = useState(false);
  const isEdit = () => {
    setEdit(!edit);
  };
  const dispatch = useDispatch();

  const { transactions, isLoading, isError } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  //decide what to render
  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occurred</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} isEdit={isEdit}/>
    ));
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transactions found!</p>;
  }
  return (
    <Layout>
      <div>
        
      </div>
      <Balance />
      <div className={edit ? "show" : "none"}>
        <Form />
      </div>

      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul >{content}</ul>
      </div>
      <Link to={"/"}>
        <button className="show-all">Go Back</button>
      </Link>
    </Layout>
  );
};

export default AllTransactions;

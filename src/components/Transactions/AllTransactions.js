import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchTransactions,
  filterBy
} from "../../features/transaction/transactionSlice";
import Balance from "../Balance";
import Form from "../Form";
import Layout from "../Layout";
import Transaction from "./Transaction";

const AllTransactions = () => {
  const [edit, setEdit] = useState(false);
  //const [search, setSearch] = useState(false);
  const isEdit = () => {
    setEdit(!edit);
  };
  const { editing, filters } = useSelector((state) => state.transaction) || {};
  const dispatch = useDispatch();

  const { transactions, isLoading, isError } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  const searchBy = (e) => {
    e.preventDefault();
    const data = e.target.value;
    console.log(data);
  };
  const filterData = (data) => {
    dispatch(filterBy(data));
  };

  //decide what to render
  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occurred</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions
      .filter((t) => {
        if (filters === "All") {
          return t;
        } else {
          return t.type === filters;
        }
      })
      .map((transaction) => (
        <Transaction
          key={transaction.id}
          transaction={transaction}
          isEdit={isEdit}
        />
      ));
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transactions found!</p>;
  }
  return (
    <Layout>
      <div className="a-c">
        <form onSubmit={searchBy}>
          <input
            className="search"
            type="text"
            name="name"
            required
            placeholder="Search"
            onChange={searchBy}
          />
          <input className="s-btn" type="submit" value="Search" />
        </form>
      </div>
      <div className="form-group radio s-all a-c">
        <div className="radio_group">
          <input
            required
            type="radio"
            value="All"
            name="type"
            onChange={(e) => filterData("All")}
          />
          <label>All</label>
        </div>
        <div className="radio_group">
          <input
            required
            type="radio"
            value="income"
            name="type"
            onChange={(e) => filterData("income")}
          />
          <label>Income</label>
        </div>
        <div className="radio_group">
          <input
            type="radio"
            value="expense"
            name="type"
            placeholder="Expense"
            onChange={(e) => filterData("expense")}
          />
          <label>Expense</label>
        </div>
      </div>
      <Balance />
      <div className={editing?.id ? "show" : "none"}>
        <Form />
      </div>

      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
      <Link to={"/"}>
        <button className="show-all">Go Back</button>
      </Link>
    </Layout>
  );
};

export default AllTransactions;

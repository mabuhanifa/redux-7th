import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAll,
  fetchTransactions,
  filterBy,
  searchBy
} from "../../features/transaction/transactionSlice";
import Balance from "../Balance";
import Form from "../Form";
import Layout from "../Layout";
import Transaction from "./Transaction";

const AllTransactions = () => {
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState(false);

  const isEdit = () => {
    setEdit(!edit);
  };
  const { editing, filters, searches } =
    useSelector((state) => state.transaction) || {};
  console.log(searches);
  const dispatch = useDispatch();

  const { transactions, isLoading, isError } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  const searchData = (e) => {
    e.preventDefault();
    dispatch(searchBy(search));
  };
  const filterData = (data) => {
    dispatch(filterBy(data));
  };
  const clear = () => {
    dispatch(clearAll());
    setSearch("");
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
      .filter((t) => {
        if (searches === "All") {
          return t;
        } else {
          return t.name.toLowerCase().includes(searches.toLowerCase());
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
        <form onSubmit={searchData}>
          <input
            className="search"
            type="text"
            name="search"
            value={search}
            required
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
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
            //checked={(filters & searches) === "All"}
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
      <div className={`clear ${searches !== "All" ? "show" : "none"}`}>
        <div>
          <button onClick={clear}>Clear Search</button>
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

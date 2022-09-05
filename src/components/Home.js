import React from "react";
import Balance from "./Balance";
import Form from "./Form";
import Layout from "./Layout";
import Transactions from "./Transactions/Transactions";

const Home = () => {
  return (
    <Layout>
      <Balance />
      <Form />
      <Transactions />
    </Layout>
  );
};

export default Home;

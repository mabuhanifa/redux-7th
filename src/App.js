import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AllTransactions from "./components/Transactions/AllTransactions";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<AllTransactions />} />
      </Routes>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Block from "./components/Block";
import Transaction from "./components/Transaction";
import Account from "./components/Account";
import Home from "./components/Home";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/block/:blockNumber" element={<Block />} />
          <Route
            path="/transaction/:transactionHash"
            element={<Transaction />}
          />
          <Route path="/account/:accountAddress" element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

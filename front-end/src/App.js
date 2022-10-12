import { useEffect, useState } from "react";
import Users from "./components/all-users";
import User from "./components/user-details";
import ErrorPage from "./components/error";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8008/accounts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setState(data);
        return data;
      });
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/accounts" element={<Users data={state} />}></Route>
          <Route path="/accounts/:id" element={<User />}></Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

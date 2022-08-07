import React, { Component } from "react";
import DashBoard from "./DashBoard";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact>
            首頁
          </Route>
          <Route path="/login" exact element={<Login />}></Route>
          {/* <Route path="/dashboard" exact element={<DashBoard />}></Route> */}
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;

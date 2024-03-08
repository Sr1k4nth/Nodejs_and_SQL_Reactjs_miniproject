import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewUser from "./Pages/ViewUser";
import AddUser from "./Pages/AddUser";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewUser />} />
        <Route path="/adduser/:id" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

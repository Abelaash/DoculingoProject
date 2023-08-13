import React, {} from "react";

import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Translate from "./pages/Translate";
import Login from "./components/Authentication/Login"

function App() {

  return (
    <div className="App">
      <Login/>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/translate" element={<Translate />} />
        </Routes>
      </div>
     </div> 
  );
}

export default App;
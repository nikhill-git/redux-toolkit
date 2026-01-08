import React from "react";

import Header from "./Header";
import Body from "./Body";
import { Outlet } from "react-router-dom";


const App = () => {

  
  return (
    <div className=" bg-gray-950 text-white">
        <Header />
        <Outlet />
    </div>
  );
};


export default App;

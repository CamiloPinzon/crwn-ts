import React, { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";

const Shop : React.FC = () : ReactElement => {
  return(
    <div>
      <h2>SHOP</h2>
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}/>
        <Route path="shop" element={<Shop />}/>
      </Route>
    </Routes>
  );
};

export default App;

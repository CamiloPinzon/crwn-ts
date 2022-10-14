import { Routes, Route } from "react-router-dom";

import { RoutesLinks } from "./routes/routes.enum";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  const { SHOP, AUTHENTICATION, CHECKOUT } = RoutesLinks;
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path={SHOP} element={<Shop />} />
        <Route path={AUTHENTICATION} element={<Authentication />} />
        <Route path={CHECKOUT} element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

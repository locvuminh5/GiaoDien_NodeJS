import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import Create from "../../Pages/Create";
import Edit from "../../Pages/Edit";
import XuatChieuCreate from "../../Pages/XuatChieuCreate";
import Coupon from "../../Pages/Coupon";
import CouponEdit from "../../Pages/CouponEdit";
import CouponCreate from "../../Pages/CouponCreate";
import Combo from "../../Pages/Combo";
import ComboEdit from "../../Pages/ComboEdit";
import ComboCreate from "../../Pages/ComboCreate";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inventory />}></Route>
      <Route path="/movies" element={<Inventory />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/edit" element={<Edit />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/xuatchieu-create" element={<XuatChieuCreate />}></Route>
      <Route path="/admin-bills" element={<Customers />}></Route>
      <Route path="/coupon" element={<Coupon />}></Route>
      <Route path="/coupon-edit" element={<CouponEdit />}></Route>
      <Route path="/coupon-create" element={<CouponCreate/>}></Route>
      <Route path="/combo" element={<Combo/>}></Route>
      <Route path="/combo-edit" element={<ComboEdit />}></Route>
      <Route path="/combo-create" element={<ComboCreate />}></Route>
    </Routes>
  );
}
export default AppRoutes;

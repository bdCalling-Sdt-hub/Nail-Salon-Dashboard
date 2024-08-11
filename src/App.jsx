import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Notification from "./Pages/Dashboard/Notification";
import Otp from "./Pages/Auth/Otp";
import Login from "./Pages/Auth/Login";
import UpdatePassword from "./Pages/Auth/UpdatePassword";
import NotFound from "./404";

import Package from "./Pages/Dashboard/Package";
import EditPackage from "./Pages/Dashboard/EditPackage";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin";
import ChangePassword from "./Pages/Dashboard/ChangePassword";
import Profile from "./Pages/Dashboard/Profile";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import SellerDetails from "./Pages/Dashboard/SellerDetails";
import Emails from "./Pages/Dashboard/Emails";
import SellerProductList from "./Pages/Dashboard/SellerProductList";

import TopSellerList from "./Pages/Dashboard/TopSellerList";

import SalonDetailsList from "./Pages/Dashboard/SalonDetailsList";
import SalonServicesList from "./Pages/Dashboard/SalonServicesList";
import UserDetailsList from "./Pages/Dashboard/UserDetailsList";
import SalonCategoryList from "./Pages/Dashboard/SalonCategoryList";
import OrdersTransaction from "./Pages/Dashboard/OrdersTransaction";
import SliderSetting from "./Pages/Dashboard/Settings/SliderSetting";
import AdminProfile from "./Pages/Dashboard/AdminProfile";
import About from "./Pages/Dashboard/Settings/About";
import PrivacyPolicy from "./Pages/Dashboard/Settings/PrivacyPolicy";
import Terms from "./Pages/Dashboard/Settings/Terms";
import FAQ from "./Pages/Dashboard/Settings/FAQ";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="maincontainer">
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              >
                <Route path="/" element={<DashboardHome />} />
                <Route path="/user-list" element={<UserDetailsList />} />
                <Route path="/salon-list" element={<SalonDetailsList />} />
                <Route
                  path="/salon-services-list"
                  element={<SalonServicesList />}
                />
                <Route
                  path="/salon-category-list"
                  element={<SalonCategoryList />}
                />
                <Route
                  path="/order-transaction-list"
                  element={<OrdersTransaction />}
                />
                <Route path="/notification" element={<Notification />} />
                <Route path="/setting" element={<SliderSetting />} />
                <Route path="/slider-setting" element={<SliderSetting />} />
                <Route path="/make-admin" element={<MakeAdmin />} />
                <Route path="/admin-profile" element={<AdminProfile />} />
                <Route path="/package" element={<Package />} />
                <Route path="/edit-package" element={<EditPackage />} />
                <Route
                  path="/setting-change-password"
                  element={<ChangePassword />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/settings-profile" element={<Profile />} />
                <Route path="/seller-details/:id" element={<SellerDetails />} />
                <Route
                  path="/seller-product-list"
                  element={<SellerProductList />}
                />
                <Route path="/emails" element={<Emails />} />
                <Route path="/top-seller-list" element={<TopSellerList />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/otp/:email" element={<Otp />} />
              <Route
                path="/update-password/:email"
                element={<UpdatePassword />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </Provider>
    </>
  );
}

export default App;

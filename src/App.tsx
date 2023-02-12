import React, { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Auth/Login";
import DashboardHome from "./components/Layout/dashboard/DashboardHome";
import AddTransaction from "./components/Layout/Transaction/AddTransaction";
import NewTransaction from "./components/Layout/Transaction/NewTransaction";
import Loading from "./components/Layout/ui/MySelect/Loading/Loading";
import Dashboard from "./components/pages/Dashboard";
import HomePage from "./components/pages/HomePage";
import { NoMatch } from "./components/pages/NoMatch";
import { GlobalContext } from "./context/GlobalState";
import { AuthService } from "./services/AuthService";

let alreadyLoggedIn = localStorage.getItem("userToken") ? true : false;

function App() {
  const [isAuth, setIsAuth] = useState(alreadyLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const { logInUser, addSite, user } = useContext(GlobalContext);

  const authService = async () => {
    setIsLoading(true);
    const res = await AuthService.auth();
    if (res && res.data.userData) {
      logInUser(res.data?.userData);
      addSite(res.data?.siteData);
      setIsAuth(true);
    }
    // if (res && res.data.userData) {
    //   if (logInUser) {
    //     logInUser(res.data.userData);
    //   }
    //   if (addSite) {
    //     addSite(res.data.siteData);
    //   }
    // }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      setIsAuth(true);
    } else {
      authService();
    }
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login isAuth={isAuth} />} />
        {isAuth && (
          <Route path="/dashboard" element={<Dashboard />}>
            {/* <Route path="transactions" element={<AddTransaction />} /> */}
            <Route path="" element={<NewTransaction />} />
            <Route path="" element={<DashboardHome />} />
          </Route>
        )}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      {isLoading && <Loading />}
    </>
  );
}

export default App;

import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { AuthService } from "../../services/AuthService";
import { TransactionService } from "../../services/TransactionService";
import convertSearchToObject from "../../utils/convertSearchToObject";
import updateLocalStorage from "../../utils/updateLocalStorage";

type Props = {
  isAuth: boolean;
};

let siteCodeFromLS = localStorage["siteCode"];

const InitialLoginFromState = {
  siteCode: siteCodeFromLS ? siteCodeFromLS : "",
  username: "",
  password: "",
};

const Login: React.FC<Props> = ({ isAuth }) => {
  const [loginFrom, setLoginFrom] = useState<any>(InitialLoginFromState);
  const [errorMessage, setErrorMessage] = useState("");

  const { logInUser, user, addSite, site } = useContext(GlobalContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: any) => {
    let modifiedLoginFrom = loginFrom;
    modifiedLoginFrom[e.target.name] = e.target.value;
    setLoginFrom({ ...modifiedLoginFrom });
  };

  const handleLoginButton = async () => {
    setErrorMessage("");
    console.log(loginFrom);
    let res = await AuthService.login(loginFrom);
    let resTransTypes = await TransactionService.getTransactionTypes();
    if (res && resTransTypes) {
      if (res.data.userData && res.data.siteData && logInUser && addSite) {
        logInUser(res.data.userData);
        updateLocalStorage("transType", resTransTypes.data);
        addSite(res.data.siteData);
        navigate("/dashboard");
      } else {
        res.data.message && setErrorMessage(res.data.message);
      }
    } else {
      setErrorMessage("Network Error");
    }
  };

  useEffect(() => {
    if (user.username) {
      if (location.search) {
        const { redirectTo } = convertSearchToObject(location.search);
        console.log(redirectTo);

        navigate(redirectTo);
      } else {
        navigate(`/dashboard`);
      }
    }
  }, [user]);

  return (
    <div className="centered full-screen">
      <div className="container">
        <div className="container-title">gBase</div>
        <div className="container-content">
          <input
            name="siteCode"
            type="text"
            placeholder="Site ID"
            onChange={handleChange}
            value={siteCodeFromLS ? siteCodeFromLS : loginFrom.siteCode}
            disabled={siteCodeFromLS ? true : false}
          />
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            onChange={handleChange}
            value={loginFrom.username}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={loginFrom.password}
          />
          {errorMessage && <span>* {errorMessage} *</span>}
          <button onClick={handleLoginButton}>Login</button>
          <p>
            Powered by:{" "}
            <a href="https://sourcecode.build" target="_blank">
              sourcecode.build
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

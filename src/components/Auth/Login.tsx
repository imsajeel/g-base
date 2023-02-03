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
  const [isLoading, setIsLoading] = useState(false);
  const { logInUser, user, addSite } = useContext(GlobalContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: any) => {
    let modifiedLoginFrom = loginFrom;
    modifiedLoginFrom[e.target.name] = e.target.value;
    setLoginFrom({ ...modifiedLoginFrom });
  };

  const handleLoginButton = async () => {
    setErrorMessage("");
    setIsLoading(true);
    let res = await AuthService.login(loginFrom);
    if (res) {
      if (res.data.userData && res.data.siteData && logInUser && addSite) {
        logInUser(res.data.userData);
        addSite(res.data.siteData);

        let resTransTypes = await TransactionService.getTransactionTypes();

        if (resTransTypes) {
          updateLocalStorage("transType", resTransTypes.data);
        } else {
          console.log(resTransTypes);
        }

        navigate("/dashboard");
      } else {
        res.data.message && setErrorMessage(res.data.message);
      }
    } else {
      setErrorMessage("Network Error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user?.username) {
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
            disabled={isLoading}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={loginFrom.password}
            disabled={isLoading}
          />
          {errorMessage && <span>* {errorMessage} *</span>}
          <button onClick={handleLoginButton} disabled={isLoading}>
            {isLoading ? (
              <img
                src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif"
                alt="loading..."
                height="20px"
              />
            ) : (
              "Login"
            )}
          </button>
          <p>
            Powered by:{" "}
            <a href="https://sourcecode.build" rel="noreferrer" target="_blank">
              sourcecode.build
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

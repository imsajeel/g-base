import React from "react";
import { TransactionService } from "../../../services/TransactionService";

const DashboardHome = () => {
  const handleTestAPI = async () => {
    const res = await TransactionService.getTransactionTypes();
    if (res) {
      console.log(res.data);
    }
  };
  return (
    <div>
      <h1>Home</h1>
      <h3>Stats will show on this page..</h3>
      <br />
      <br />
      <button onClick={handleTestAPI}>Test API</button>
    </div>
  );
};

export default DashboardHome;

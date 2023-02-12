import React, { useState } from "react";
import "./AddTransaction";
import IncomeTransaction from "./IncomeTransaction";
import { INCOME, SPENDING } from "./newTransactionTypes";
import SpendingTransaction from "./SpendingTransaction";

const NewTransaction = () => {
  const [data, setData] = useState<any>({});
  return (
    <div className="new-transaction">
      <h1>New Transaction</h1>
      <div
        className="transaction-type"
        // style={{ display: data?.transactionType ? "none" : "flex" }}s
      >
        <button
          className="big"
          disabled={data.transactionType === SPENDING ? true : false}
          onClick={() => {
            setData({ ...data, transactionType: INCOME });
          }}
        >
          Income
        </button>
        <button
          className="big"
          disabled={data.transactionType === INCOME ? true : false}
          onClick={() => {
            setData({ ...data, transactionType: SPENDING });
          }}
        >
          Spending
        </button>
      </div>
      {data.transactionType === INCOME && (
        <IncomeTransaction data={data} setData={setData} />
      )}
      {data.transactionType === SPENDING && (
        <SpendingTransaction data={data} setData={setData} />
      )}
    </div>
  );
};

export default NewTransaction;

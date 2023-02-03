import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { TransactionService } from "../../../services/TransactionService";
import { transactionData } from "../../../types/transactionData";
import "./Transaction.css";

const AddTransaction = () => {
  const { user } = useContext(GlobalContext);
  const transTypesDataFromLS = localStorage["transType"];
  const transTypesData = transTypesDataFromLS
    ? JSON.parse(transTypesDataFromLS)
    : "";

  const [formData, setFormData] = useState<transactionData>();
  const [displayMessage, setDisplayMessage] = useState({ type: "", text: "" });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setDisplayMessage({ type: "", text: "" });
    if (
      formData &&
      formData.title &&
      formData.amount &&
      formData.transactionMethod &&
      formData.transactionType
    ) {
      let modifiedFormData = formData;
      if (formData.transactionMethod === "credit") {
        modifiedFormData = {
          ...modifiedFormData,
          amount: formData.amount * -1,
        };
        delete modifiedFormData.transactionMethod;
      }
      const res = await TransactionService.addTransaction(modifiedFormData);
      if (res && res.data && res.data.result) {
        setDisplayMessage({
          type: "success",
          text: res.data.message,
        });
        setFormData(undefined);
      } else
        setDisplayMessage({
          type: "error",
          text: "Something went wrong.",
        });
    } else {
      setDisplayMessage({
        type: "error",
        text: "Please enter all required feilds. *",
      });
    }
  };

  const handleClear = () => {
    setFormData(undefined);
    setDisplayMessage({ type: "", text: "" });
  };

  return (
    <>
      <div className="add-transaction-form">
        <h1 className="page-heading">Add Transaction</h1>
        <label htmlFor="title">Title: *</label>
        <input
          type="text"
          name="title"
          placeholder="Enter transaction title"
          onChange={handleChange}
          value={formData ? (formData.title ? formData.title : "") : ""}
        />
        <label htmlFor="amount">Amount (£): *</label>
        <input
          type="number"
          name="amount"
          placeholder="Enter transaction amount"
          onChange={handleChange}
          value={formData ? (formData.amount ? formData.amount : "") : ""}
        />
        <label htmlFor="debit-credit">Transaction: *</label>
        <div>
          <label htmlFor="debit" className="form-control">
            <input
              type="radio"
              id="debit"
              name="transactionMethod"
              value="debit"
              onChange={handleChange}
            />
            Debit +
          </label>
          <label htmlFor="credit" className="form-control">
            <input
              type="radio"
              id="credit"
              name="transactionMethod"
              value="credit"
              onChange={handleChange}
            />
            Credit -
          </label>
        </div>

        <label htmlFor="transactionType">Type: *</label>
        <select
          name="transactionType"
          id="type"
          onChange={handleChange}
          value={
            formData
              ? formData.transactionType
                ? formData.transactionType
                : ""
              : ""
          }
        >
          {transTypesData[0] ? (
            transTypesData.map((item: any, i: number) => (
              <option value={item.value} key={i}>
                {item.name}
              </option>
            ))
          ) : (
            <option value="sales-card">Sales Card</option>
          )}
        </select>

        <label htmlFor="remarks">Remarks:</label>
        <textarea
          name="remarks"
          placeholder="Remarks about transaction"
          style={{ height: "100px", padding: "0.5rem" }}
          onChange={handleChange}
          value={formData ? (formData.remarks ? formData.remarks : "") : ""}
        />
        <label htmlFor="images">Upload Images:</label>
        <input
          type="file"
          name="images"
          id="images"
          accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
        />
        <div></div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gridColumnStart: "1",
            gridColumnEnd: "3",
            alignItems: "center",
            // width: "100%",
          }}
        >
          {displayMessage.type && (
            <div
              style={{
                color: displayMessage.type === "success" ? "green" : "red",
                fontWeight: "bolder",
                marginRight: "1rem",
              }}
            >
              {displayMessage.text}
            </div>
          )}

          <button className="transparent" onClick={handleClear}>
            Clear
          </button>
          <button style={{ marginLeft: "1rem" }} onClick={handleSubmit}>
            Add Transaction
          </button>
        </div>
      </div>
      <div>
        <button>Fetch All Transaction</button>
      </div>
    </>
  );
};

export default AddTransaction;

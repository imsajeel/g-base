import React, { useState } from "react";
import paymentMethodsList from "../../../database/paymentMethodsList";
import transactionToList from "../../../database/trasactionToList";
import { TransactionRefService } from "../../../services/TransactionRefService";

const SpendingTransaction = ({ data, setData }: any) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionRefIdList, setTransactionRefIdList] = useState<any>([]);

  const fetchRefList = async (value: string) => {
    if (value) {
      let res;
      switch (value) {
        case "supplier":
          res = await TransactionRefService.getSuppliers();
          break;
        case "customer":
          res = await TransactionRefService.getCustomers();
          break;
        case "employee":
          res = await TransactionRefService.getEmployees();
          break;
        default:
          break;
      }
      //   console.log("first", res?.data);
      setTransactionRefIdList(res?.data);
    }
  };
  const handleSubmit = () => {
    console.log(data);
  };

  return (
    <div>
      <div className="title-amount">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          style={{ width: "100%" }}
          placeholder="Enter title of transaction (Leave blank for automated generation)"
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
        />
        <label htmlFor="transaction-to">Transaction to</label>
        <br />
        {transactionToList.map((item, i) => (
          <button
            disabled={
              data.transaction_to_ref && data.transaction_to_ref !== item.value
                ? true
                : false
            }
            style={{ margin: "0.5rem" }}
            onClick={async () => {
              await fetchRefList(item.value);
              await setData({ ...data, transaction_to_ref: item.value });
            }}
            key={i}
          >
            {item.title}
          </button>
        ))}
        <br />
        <br />
        {data?.transaction_to_ref &&
          data?.transaction_to_ref !== "others" &&
          transactionRefIdList && (
            <>
              <label htmlFor="transaction-to">
                {data?.transaction_to_ref.charAt(0).toUpperCase() +
                  data?.transaction_to_ref.slice(1)}
              </label>
              <select
                name={`${data?.transaction_to_ref}-select`}
                onChange={(e) => {
                  console.log(e.target.value);
                  setData({ ...data, transaction_to_ref_id: e.target.value });
                }}
                value={
                  data?.transaction_to_ref_id ? data?.transaction_to_ref_id : ""
                }
              >
                <option value="">{`Select ${data?.transaction_to_ref}`}</option>
                {transactionRefIdList.map((item: any, i: any) => (
                  <option value={item._id} key={i}>
                    {item.name}
                  </option>
                ))}
              </select>
            </>
          )}
      </div>
      <div>
        {data?.transaction_to_ref &&
          data?.transaction_to_ref !== "others" &&
          !data?.transaction_to_ref_id && (
            <button
              className="transparent"
              onClick={() => {
                let modifiedData = data;
                delete modifiedData.transaction_to_ref;
                delete modifiedData.transaction_to_ref_id;
                setData({ ...modifiedData });
              }}
            >
              Back
            </button>
          )}
      </div>
      {(data?.transaction_to_ref === "others" ||
        data?.transaction_to_ref_id) && (
        <div className="amounts">
          <label htmlFor="amount-total">Amount Total</label>
          <input
            type="number"
            className="amount"
            name="amount"
            id="totalAmount"
            value={data?.amount ? data?.amount : 0}
            onChange={(e) => {
              setData({ ...data, amount: e.target.value });
            }}
            placeholder="Enter Total Amount"
          />
          <label htmlFor="amount-paid">Amount paid</label>
          <input
            type="number"
            className="amount"
            value={data?.amount_paid ? data?.amount_paid : 0}
            name="amount"
            id="amount-paid"
            onChange={(e) => {
              setData({ ...data, amount_paid: e.target.value });
            }}
            placeholder="Enter Paid Amount"
          />
          <br />
          <br />
        </div>
      )}
      {(data?.amount || data?.amount_paid) && (
        <div className="payment-methods">
          <label htmlFor="payment-method">Payment Methods</label>
          <br />

          {paymentMethodsList.map((item, i) => (
            <button
              disabled={
                data.paymentMethod && data.paymentMethod !== item.value
                  ? true
                  : false
              }
              style={{ margin: "0.5rem" }}
              onClick={() => {
                setData({ ...data, paymentMethod: item.value });
              }}
              key={i}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
      {(data?.amount ||
        data?.amount_paid ||
        data?.transaction_to_ref === "others") && (
        <button
          className="transparent"
          onClick={() => {
            let modifiedData = data;
            if (modifiedData.transaction_to_ref === "others") {
              delete modifiedData.transaction_to_ref;
            }
            delete modifiedData.transaction_to_ref_id;
            delete modifiedData.amount;
            delete modifiedData.amount_paid;
            setData({ ...modifiedData });
          }}
        >
          Back
        </button>
      )}
      {data?.paymentMethod && (
        <div>
          <label htmlFor="images">Upload Images:</label>
          <br />
          <input
            type="file"
            disabled={loading}
            name="images"
            id="images"
            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
          />
          <br />
          <br />
          <label htmlFor="remarks">Remarks:</label>
          <br />

          <textarea
            name="remarks"
            placeholder="Remarks about transaction"
            disabled={loading}
            onChange={(e) => {
              setData({ ...data, remarks: e.target.value });
            }}
            style={{ height: "100px", padding: "0.5rem" }}
          />
        </div>
      )}
      {data?.paymentMethods && (
        <button
          className="transparent"
          onClick={() => {
            let modifiedData = data;
            delete modifiedData.transaction_to_ref;
            delete modifiedData.transaction_to_ref_id;
            setData({ ...modifiedData });
          }}
        >
          Back
        </button>
      )}
      <br />
      <br />
      {data?.paymentMethod && (
        <div className="confirmation">
          <button onClick={handleSubmit}>
            {loading ? (
              <img
                src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif"
                alt="loading..."
                height="20px"
              />
            ) : (
              "Submit"
            )}
          </button>
          &nbsp; &nbsp; &nbsp;
          {!loading && (
            <button
              className="transparent"
              onClick={() => {
                let modifiedData = { ...data };
                delete modifiedData.paymentMethod;
                setData({ ...modifiedData });
              }}
            >
              Back
            </button>
          )}
          &nbsp; &nbsp; &nbsp;
          {errorMessage && "Message: " + errorMessage}
        </div>
      )}
    </div>
  );
};

export default SpendingTransaction;

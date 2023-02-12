import React, { useState } from "react";
import { GoCreditCard } from "react-icons/go";
import { BsCash } from "react-icons/bs";
import { CARD, CASH, INCOME, SPENDING } from "./newTransactionTypes";

const IncomeTransaction = ({ data, setData }: any) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async () => {
    setLoading(true);

    let finalData = {
      title:
        data?.transactionType + " from " + data?.paymentMethod + " payments",
      paymentMethod: data?.paymentMethod,
      amount: data?.amount,
      amount_paid: data?.amount,
      transaction_to_ref: INCOME,
      images: data?.images,
      remarks: data?.remarks,
    };
    console.log(finalData);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      <div className="total_amount">
        <label htmlFor="amount">Total Amount</label>
        <br />
        <input
          disabled={data?.amount ? true : false}
          type="number"
          className="amount"
          name="amount"
          id="totalAmount"
          placeholder="Enter Total Amount"
          value={data.input_amount ? data.input_amount : 0}
          onChange={(e) => {
            setData({ ...data, input_amount: Number(e.target.value) });
          }}
        />
        {!data?.amount && (
          <>
            <button
              onClick={() => {
                let modiefiedAmount =
                  data?.input_amount < 0
                    ? data?.input_amount * -1
                    : data?.input_amount;
                setData({
                  ...data,
                  amount:
                    data?.transactionType === SPENDING
                      ? modiefiedAmount * -1
                      : modiefiedAmount,
                });
              }}
              disabled={data?.input_amount ? false : true}
            >
              Next
            </button>
            <button
              className="transparent"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => {
                setData({});
              }}
            >
              Back
            </button>
          </>
        )}
      </div>
      <br />
      <br />
      {data.amount && (
        <div className="payment-method">
          <label htmlFor="Payment Method:">
            <button
              disabled={data.paymentMethod === CARD ? true : false}
              onClick={() => {
                setData({ ...data, paymentMethod: CASH });
              }}
            >
              <BsCash /> Cash
            </button>
            &nbsp; &nbsp; &nbsp;
            <button
              disabled={data.paymentMethod === CASH ? true : false}
              onClick={() => {
                setData({ ...data, paymentMethod: CARD });
              }}
            >
              <GoCreditCard /> Card
            </button>
            &nbsp; &nbsp; &nbsp;
            {!data?.paymentMethod && (
              <button
                className="transparent"
                onClick={() => {
                  let modifiedData = { ...data };
                  delete modifiedData.amount;
                  setData({ ...modifiedData });
                }}
              >
                Back
              </button>
            )}
          </label>
        </div>
      )}
      <br />
      <br />
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

export default IncomeTransaction;

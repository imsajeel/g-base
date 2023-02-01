import { transactionData } from "../types/transactionData";
import api from "./API";

export const TransactionService = {
  getTransactionTypes: async () => {
    return await api.get(`/api/transaction/get-types`);
  },

  addTransaction: async (props: transactionData) => {
    return await api.post(`/api/transaction/add`, { ...props });
  },
};

import api from "./API";

export const TransactionRefService = {
  getSuppliers: async () => {
    return await api.get(`/api/suppliers`);
  },
  getCustomers: async () => {
    return await api.get(`/api/customers`);
  },
  getEmployees: async () => {
    return await api.get(`/api/employees`);
  },
};

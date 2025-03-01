import api from "../api";

// Function to get transactions with pagination and filters
export async function getTransaction({ page, reference, startdate, enddate, type, status, currency, reason }) {
  const response = await api.getTransaction({
    params: {
      page,
      search: reference,
      from: startdate,
      until: enddate,
      is_credit: type,
      status,
      currency,
      reason,
    },
  });
  return response;
}

// Function to get the full length of transactions for export
export async function getexportTransaction({ startdate, enddate }) {
  const response = await api.getTransactionFullLength({
    params: {
      from: startdate,
      until: enddate,
      currency: "NGN",
    },
  });
  return response;
}

// Function to get customers with pagination and search
export async function getCustomers() {
  const response = await api.getCustomers();
  return response;
}

// Function to create a new customer
export async function createCustomer(data) {
  const response = await api.createCustomers(data);
  return response;
}

// Function to update an existing customer
export async function updateCustomer(id, data) {
  const response = await api.updateCustomers(id, data);
  return response;
}




  export async function getTag() {
    try {
      const response = await api.getTags();

      return response;
    } catch (error) {
      return error;
    }
  }


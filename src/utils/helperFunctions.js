import api from "../api";

export const getRoles = async () => {
  try {
    const response = await api.getRoles({
      params: {},
    });
    return response;
  } catch (e) {}
};


export async function getUsers() {
    try {
      const response = await api.getUsers();
      console.log("users===>", response);

      return response;
    } catch (error) {
      return error;
    }
  }

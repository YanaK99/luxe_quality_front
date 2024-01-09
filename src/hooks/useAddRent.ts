import { IRent } from "../types/modules.ts";
import axios from "../utils/axios.ts";

export function useAddRent(pushRent: (rent: IRent) => void) {
  const addRent = async (formData: IRent) => {
    try {
      const response = await axios.post<unknown, IRent>("/rents", formData);
      pushRent(response);
    } catch (error) {
      console.error("Error while submitting form:", error);
    }
  };

  return { addRent };
}

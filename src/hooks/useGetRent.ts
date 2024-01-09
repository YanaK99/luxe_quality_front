import axios from "../utils/axios.ts";
import { IRent } from "../types/modules.ts";

export function useGetRent(setRent: (rent: IRent) => void) {
  const fetchRent = async (id: string) => {
    try {
      const data = await axios.get<unknown, IRent>(`/rents/${id}`);
      setRent(data);
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error while submitting form:", error);
    }
  };

  return { fetchRent };
}

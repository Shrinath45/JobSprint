import axios from "axios";

import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

// Fetch all companies (used after delete or on page load)
export const getCompanyAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${COMPANY_API_END_POINT}/get`, {
      withCredentials: true,
    });
    dispatch(setCompanies(data.companies));
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to load companies");
  }
};

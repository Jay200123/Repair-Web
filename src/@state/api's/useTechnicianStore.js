import { basicApi } from "@axios";

export const useTechnicianStore = (_set) => ({
  getAllTechnicians: async () => {
    const results = await basicApi.get("/technicians");

    return results?.data;
  },
});

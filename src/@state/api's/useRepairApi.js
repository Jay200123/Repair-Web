import { basicApi } from "@axios";

export const useRepairStore = (_set) => ({
  getAllRepairs: async () => {
    const result = await basicApi.get("/repairs");

    return result?.data;
  },

  getRepairById: async (id) => {
    const result = await basicApi.get(`/repair/${id}`);

    return result.data;
  },

  addRepair: async (data) => {
    const result = await basicApi.post("/repairs", data);

    return result?.data;
  },
});

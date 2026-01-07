import { basicApi } from "@axios";

export const useRepairStore = (_set) => ({
  getAllRepairs: async (limit, offset) => {
    const result = await basicApi.get("/repairs", {
      params: {
        limit: limit,
        offset: offset,
      },
    });

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

  getRepairsByDateRepaired: async (date_from, date_to) => {
    const results = await basicApi.get("/repairs/repaired", {
      params: {
        date_from: date_from,
        date_to: date_to,
      },
    });

    return results?.data;
  },
});

import { basicApi } from "@axios";

export const useUnitStore = (_set) => ({
  getAllUnits: async () => {
    const results = await basicApi.get("/units");

    return results.data;
  },

  getUnitsBySKU: async (unit_sku) => {
    const results = await basicApi.get("/units/sku", {
      params: {
        unit_sku: unit_sku,
      },
    });

    return results.data;
  },

  getSKU: async () => {
    const results = await basicApi.get("/sku");

    return results.data;
  },
});

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRepairStore } from "./api's/useRepairStore";
import { useUnitStore } from "./api's/useUnitStore";

export const useStore = create()(
  persist(
    (...a) => ({
      // slices here
      //ex - ...useGreetSlice(...a)

      //custom api hooks here
      //ex - ...useAuthStore(...a)
      ...useRepairStore(...a),
      ...useUnitStore(...a),
    }),
    {
      name: "storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

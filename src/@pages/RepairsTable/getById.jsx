import { useStore } from "../../@state/store";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";

export default function GetRepairDetailsByID() {
  const { id } = useParams();

  const { getRepairById } = useStore();

  const { data } = useQuery({
    queryKey: ["repair", id],
    queryFn: () => getRepairById(id),
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });

  const repair = data?.details || {};

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="lg:w-200 lg:h-auto md:w-180 md:h-auto h-full w-full flex rounded-lg bg-white lg:shadow-lg md:shadow-lg shadow-none lg:m-0 md:m-3.5">
        <div className="w-full flex flex-col justify-center">
          <form className="lg:px-6 lg:py-6 md:px-4 md:py-4 px-2 py-2">
            <h3 className="lg:text-4xl md:text-2xl text-lg text-center font-semibold">
              Repair Forms
            </h3>
            <p className="lg:text-base md:text-sm text-xs text-center text-gray-600 mb-6">
              Please provide accurate details of the repair work performed.
            </p>

            {/* Grid container for two inputs per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Work Done */}
              <div className="flex flex-col">
                <label htmlFor="work_done">Work Done</label>
                <div className="relative">
                  <i className="fa-solid fa-screwdriver-wrench absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    id="work_done"
                    name="work_done"
                    className="p-1.5 border border-gray-400 w-full rounded-md pl-10 pr-3 focus:outline-none focus:border-[#63C6B5]"
                    placeholder="Summarize work completed"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center items-center p-2.5 mt-6">
              <button
                type="submit"
                className="w-full lg:text-lg md:text-base text-sm rounded-md bg-[#63C6B5] px-2 py-2 text-white border border-[#63C6B5] transition-all ease-in-out duration-500 hover:bg-white hover:text-[#63C6B5] cursor-pointer"
              >
                {" "}
                Create Repair Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useStore } from "../../@state/store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateRepair() {
  const navigate = useNavigate();

  const { getSKU, getUnitsBySKU, addRepair } = useStore();

  const [unitSKU, setUnitSKU] = useState("");

  const { data } = useQuery({
    queryKey: ["sku"],
    queryFn: getSKU,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });

  const unit_sku = data?.details || [];

  const { data: unitData } = useQuery({
    queryKey: ["units", unitSKU],
    queryFn: () => getUnitsBySKU(unitSKU),
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });

  const units = unitData?.details || [];

  const handleChange = (e) => {
    const selectedSKU = e.target.value;
    setUnitSKU(selectedSKU);

    // resets the dependent dropdown.
    formik.setFieldValue("unit_id", "");
  };

  const formik = useFormik({
    initialValues: {
      unit_id: 0,
      serial_number: "",
      actual_problem: "",
      unit_findings: "",
      work_done: "",
      date_returned: "",
      date_repaired: "",
      unit_status: "",
      unit_remarks: "",
      unit_category: "",
      technician_id: 0,
    },

    onSubmit: async (values) => {
      const results = await addRepair(values);
      
      console.log({ response: results.data });
      toast.success("Repairs submitted successfully.");
      navigate("/repairs");
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="lg:w-200 lg:h-auto md:w-180 md:h-auto h-full w-full flex rounded-lg bg-white lg:shadow-lg md:shadow-lg shadow-none lg:m-0 md:m-3.5">
        <div className="w-full flex flex-col justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className="lg:px-6 lg:py-6 md:px-4 md:py-4 px-2 py-2"
          >
            <h3 className="lg:text-4xl md:text-2xl text-lg text-center font-semibold">
              Repair Forms
            </h3>
            <p className="lg:text-base md:text-sm text-xs text-center text-gray-600 mb-6">
              Please provide accurate details of the repair work performed.
            </p>

            {/* Grid container for two inputs per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="item_sku">Unit SKU</label>
                <div className="relative">
                  <i className="fa-solid fa-clipboard-list absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <select
                    id="unit_sku"
                    name="unit_sku"
                    onChange={handleChange}
                    value={unitSKU}
                    className="p-1.5 border border-gray-400 w-full rounded-md pl-10 pr-3 focus:outline-none focus:border-[#63C6B5]"
                  >
                    <option value="" disabled>
                      SELECT UNIT SKU
                    </option>

                    {unit_sku.map((sku, index) => (
                      <option key={index} value={sku.unit_sku}>
                        {sku.unit_sku}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Unit Category */}
              <div className="flex flex-col">
                <label htmlFor="unit_id">Unit Name</label>
                <div className="relative">
                  <i className="fa-solid fa-box-archive absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <select
                    id="unit_id"
                    name="unit_id"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.unit_id}
                    className="p-1.5 border border-gray-400 w-full rounded-md pl-10 pr-3 focus:outline-none focus:border-[#63C6B5]"
                  >
                    <option value="" disabled>
                      SELECT UNIT
                    </option>
                    {units?.map((units) => (
                      <option key={units.id} value={units.id}>
                        {units.unit_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Serial Number */}
              <div className="flex flex-col">
                <label htmlFor="serial_number">Serial Number</label>
                <div className="relative">
                  <i className="fa-solid fa-barcode absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    id="serial_number"
                    name="serial_number"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.serial_number}
                    className="p-1.5 border border-gray-400 w-full rounded-md pl-10 pr-3 focus:outline-none focus:border-[#63C6B5]"
                    placeholder="Ex: 123456"
                  />
                </div>
              </div>

              {/* Actual Problem */}
              <div className="flex flex-col">
                <label htmlFor="actual_problem">Actual Problem</label>
                <div className="relative">
                  <i className="fa-solid fa-exclamation absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    id="actual_problem"
                    name="actual_problem"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.actual_problem}
                    className="p-1.5 border border-gray-400 w-full rounded-md pl-10 pr-3 focus:outline-none focus:border-[#63C6B5]"
                    placeholder="Describe the issue"
                  />
                </div>
              </div>

              {/* Unit Findings */}
              <div className="flex flex-col">
                <label htmlFor="unit_findings">Unit Findings</label>
                <div className="relative">
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    id="unit_findings"
                    name="unit_findings"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.unit_findings}
                    className="p-1.5 border border-gray-400 w-full rounded-md pl-10 pr-3 focus:outline-none focus:border-[#63C6B5]"
                    placeholder="Document your inspection"
                  />
                </div>
              </div>

              {/* Work Done */}
              <div className="flex flex-col">
                <label htmlFor="work_done">Work Done</label>
                <div className="relative">
                  <i className="fa-solid fa-screwdriver-wrench absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    id="work_done"
                    name="work_done"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.work_done}
                    className="p-1.5 border border-gray-400 w-full rounded-md pl-10 pr-3 focus:outline-none focus:border-[#63C6B5]"
                    placeholder="Summarize work completed"
                  />
                </div>
              </div>

              {/* Date Repaired */}
              <div className="flex flex-col">
                <label htmlFor="date_repaired">Date Repaired</label>
                <div className="relative">
                  <i className="fa-solid fa-calendar absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="date"
                    id="date_repaired"
                    name="date_repaired"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.date_repaired}
                    className="p-1.5 border border-gray-400 w-full rounded-md pl-10 pr-3 focus:outline-none focus:border-[#63C6B5]"
                  />
                </div>
              </div>

              {/* Date Returned */}
              <div className="flex flex-col">
                <label htmlFor="date_returned">Date Returned</label>
                <div className="relative">
                  <i className="fa-solid fa-calendar absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="date"
                    id="date_returned"
                    name="date_returned"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.date_returned}
                    className="p-1.5 border border-gray-400 w-full rounded-md pl-10 pr-3 focus:outline-none focus:border-[#63C6B5]"
                  />
                </div>
              </div>

              {/* Unit Status */}
              <div className="flex flex-col">
                <label htmlFor="unit_status">Unit Status</label>
                <div className="relative">
                  <i className="fa-solid fa-check absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <select
                    id="unit_status"
                    name="unit_status"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.unit_status}
                    className="p-1.5 border border-gray-400 w-full rounded-md pl-10 pr-3 focus:outline-none focus:border-[#63C6B5]"
                  >
                    <option value="" disabled>
                      Select status…
                    </option>
                    <option value="GOOD">GOOD</option>
                    <option value="FOR_REPAIR">FOR REPAIR</option>
                    <option value="UNDER_OBSERVATION">UNDER OBSERVATION</option>
                    <option value="FOR_SCRAP">FOR SCRAP</option>
                  </select>
                </div>
              </div>

              {/* Unit Remarks */}
              <div className="flex flex-col">
                <label htmlFor="unit_remarks">Unit Remarks</label>
                <div className="relative">
                  <i className="fa-solid fa-clipboard-list absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <select
                    id="unit_remarks"
                    name="unit_remarks"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.unit_remarks}
                    className="p-1.5 border border-gray-400 w-full rounded-md pl-10 pr-3 focus:outline-none focus:border-[#63C6B5]"
                  >
                    <option value="" disabled>
                      Select remarks…
                    </option>
                    <option value="CLASS-B">CLASS B</option>
                    <option value="CLASS-C">CLASS C</option>
                    <option value="CLASS-D">CLASS D</option>
                    <option value="FOR-SHIP">FOR SHIP</option>
                  </select>
                </div>
              </div>

              {/* Unit Category */}
              <div className="flex flex-col">
                <label htmlFor="unit_category">Unit Category</label>
                <div className="relative">
                  <i className="fa-solid fa-box-archive absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <select
                    id="unit_category"
                    name="unit_category"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.unit_category}
                    className="p-1.5 border border-gray-400 w-full rounded-md pl-10 pr-3 focus:outline-none focus:border-[#63C6B5]"
                  >
                    <option value="" disabled>
                      Select category…
                    </option>
                    <option value="CUSTOMER_UNIT">CUSTOMER UNIT</option>
                    <option value="DEFECTIVE_UNIT">DEFECTIVE UNIT</option>
                  </select>
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

import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../@state/store";
import { FadeLoader } from "react-spinners";
import { FaPenAlt, FaEye } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function RepairsTable() {
  const navigate = useNavigate();

  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { getAllRepairs, getRepairsByDateRepaired } = useStore();

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["repairs", limit, offset],
    queryFn: () => getAllRepairs(limit, offset),
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
  });

  const repairs = data?.details ?? [];

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { data: repairsData } = useQuery({
    queryKey: ["repaired_units", fromDate, toDate],
    queryFn: () => getRepairsByDateRepaired(fromDate, toDate),
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
  });

  const units_repaired = repairsData?.details || [];

  //Handlers v2
  const handleNext = () => {
    if (repairs?.length === limit) {
      setOffset((prev) => prev + limit);
    }
  };

  const handlePrev = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  const handleExportExcel = async () => {
    if (!units_repaired || units_repaired.length === 0) {
      alert("No data available to export.");
      return;
    }

    // 1. Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Repaired Units");

    // 2. Generate headers dynamically from first object keys
    const columns = Object.keys(units_repaired[0]).map((key) => ({
      header: key.toUpperCase(),
      key: key,
      width: 20,
    }));

    worksheet.columns = columns;

    // 3. Add data rows
    units_repaired.forEach((item) => {
      worksheet.addRow(item);
    });

    // 4. Style header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { horizontal: "center" };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "CCCCCCC" },
    };

    // 5. Generate buffer and save
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, `TECHNICIANS_REPORTS_${fromDate}_to_${toDate}.xlsx`);

    setIsExportModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="w-full mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header with title and Add button */}
        <div className="flex items-center justify-between w-full px-6 py-4 border-b border-gray-200">
          <h2 className="lg:text-2xl md:text-lg text-base font-semibold text-gray-800">
            Repairs Table
          </h2>

          <div className="flex items-center">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-3 py-1 lg:text-lg md:text-base text-sm font-medium text-white bg-green-500 rounded transition-all ease-in-out duration-500 hover:bg-white hover:text-green-500 border border-green-500 cursor-pointer mr-2.5"
            >
              <i className="fa-solid fa-file-excel mr-1.5"></i> Generate Excel
              File
            </button>
            <button
              onClick={() => navigate("/create/repair")}
              className="px-3 py-1 lg:text-lg md:text-base text-sm font-medium text-white bg-indigo-500 rounded  transition-all ease-in-out duration-500 hover:bg-white hover:text-indigo-500 border border-indigo-500 cursor-pointer"
            >
              <i className="fa-solid fa-plus mr-1.5"></i>Add Repair Record
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <FadeLoader color="#63C6B5" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-black">
                <thead className="bg-[#63C6B5] text-white uppercase tracking-wide font-normal">
                  <tr>
                    <th className="px-5 py-4">ID</th>
                    <th className="px-5 py-4">Item SKU</th>
                    <th className="px-5 py-4">Item Name</th>
                    <th className="px-5 py-4">Serial Number</th>
                    <th className="px-5 py-4 w-64">Actual Problem</th>
                    <th className="px-5 py-4 w-64">Unit Findings</th>
                    <th className="px-5 py-4 w-64">Work Done</th>
                    <th className="px-5 py-4">Date Returned</th>
                    <th className="px-5 py-4">Date Repaired</th>
                    <th className="px-5 py-4">Unit Status</th>
                    <th className="px-5 py-4">Unit Remarks</th>
                    <th className="px-5 py-4">Unit Category</th>
                    <th className="px-5 py-4">Technician</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-[15px]">
                  {repairs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={14}
                        className="px-5 py-6 text-center text-gray-500"
                      >
                        No repair records found.
                      </td>
                    </tr>
                  ) : (
                    repairs.map((row, index) => (
                      <tr
                        key={row._id || index}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-5 py-4">{row.repair_id || "—"}</td>
                        <td className="px-5 py-4">{row.item_sku || "—"}</td>
                        <td className="px-5 py-4">{row.item_name || "—"}</td>
                        <td className="px-5 py-4">
                          {row.serial_number || "—"}
                        </td>
                        <td className="px-5 py-4 w-64">
                          {row.actual_problem || "—"}
                        </td>
                        <td className="px-5 py-4 w-64">
                          {row.unit_findings || "—"}
                        </td>
                        <td className="px-5 py-4 w-64">
                          {row.work_done || "—"}
                        </td>
                        <td className="px-5 py-4">
                          {row.date_returned
                            ? new Date(row.date_returned).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="px-5 py-4">
                          {row.date_repaired
                            ? new Date(row.date_repaired).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="px-5 py-4">{row.unit_status || "—"}</td>
                        <td className="px-5 py-4">{row.unit_remarks || "—"}</td>
                        <td className="px-5 py-4">
                          {row.unit_category || "—"}
                        </td>
                        <td className="px-5 py-4">
                          {row.technician_name || "—"}
                        </td>
                        <td className="px-5 py-4 flex items-center gap-2">
                          <FaEye className="text-green-500 text-lg cursor-pointer mr-1" />
                          <FaPenAlt className="text-blue-500 text-lg cursor-pointer mr-1" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4 px-4 py-2">
              <button
                onClick={handlePrev}
                disabled={offset === 0}
                className="px-3 py-1 cursor-pointer bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {offset / limit + 1}
              </span>
              <button
                onClick={handleNext}
                disabled={repairs?.length < limit}
                className="px-3 py-1 cursor-pointer bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>

              {isFetching && (
                <span className="text-sm text-gray-400 ml-2">Loading…</span>
              )}
            </div>

            {isExportModalOpen && (
              <div className="transition-all ease-in-out duration-300 fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Export Repair Records
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        From Date
                      </label>
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        To Date
                      </label>
                      <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => setIsExportModalOpen(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleExportExcel}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                    >
                      Export
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

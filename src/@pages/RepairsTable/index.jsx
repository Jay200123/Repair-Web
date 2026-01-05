import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../@state/store";
import { FadeLoader } from "react-spinners";
import { FaPenAlt, FaEye } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RepairsTable() {
  const navigate = useNavigate();

  const { getAllRepairs } = useStore();

  const { isLoading, data } = useQuery({
    queryKey: ["repairs"],
    queryFn: getAllRepairs,
  });

  const repairs = data?.details ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // You can adjust this

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const totalPages = Math.ceil(repairs.length / rowsPerPage);

  // Slice repairs to show only the current page
  const paginatedRepairs = repairs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handlers
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleExportExcel = () => {
    const filtered = repairs.filter((r) => {
      const created = new Date(r.createdAt);

      if (fromDate && created < new Date(fromDate)) return false;
      if (toDate && created > new Date(toDate)) return false;

      return true;
    });

    exportToExcel(filtered); // your SheetJS / ExcelJS function
    setIsExportModalOpen(false);
  };

  const exportToExcel = (rows) => {
    const data = rows.map((r) => ({
      RepairID: r.repair_id,
      ItemSKU: r.item_sku,
      ItemName: r.item_name,
      Technician: r.technician_name,
      Status: r.unit_status,
      CreatedAt: new Date(r.createdAt).toLocaleDateString(),
    }));

    // SheetJS or ExcelJS logic here
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
                    paginatedRepairs.map((row, index) => (
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
                          <FaEye className="text-green-500 text-lg mr-1" />
                          <FaPenAlt className="text-blue-500 text-lg mr-1" />
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
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
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

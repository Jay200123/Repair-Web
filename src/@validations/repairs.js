import * as yup from "yup";

const createRepairsSchema = yup.object({
  unit_id: yup.number().required("unit is required"),
  serial_number: yup.string().required("serial number is required"),
  actual_problem: yup.string().required("actual problem is required"),
  unit_findings: yup.string().required("unit findings is required"),
  work_done: yup.string().required("work done is required"),
  order_id: yup.string().required("order id is required"),
  date_returned: yup.date().required("date returned is required"),
  date_repaired: yup.date().required("date repaired is required"),
  unit_status: yup.string().required("unit status is required"),
  unit_remarks: yup.string().required("unit remarks is required"),
  unit_category: yup.string().required("unit category is required"),
  technician_id: yup.number().required("technician is required"),
});

export { createRepairsSchema }

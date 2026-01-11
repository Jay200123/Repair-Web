import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { MotionWrapper } from "@components";
import { MainLayout } from "@layouts";
import {
  RepairsTable,
  CreateRepair,
  Dashboard,
  GetRepairDetailsByID,
} from "@pages";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <MotionWrapper>
              <Dashboard />
            </MotionWrapper>
          }
        />

        {/* Repairs Table */}
        <Route
          path="/repairs"
          element={
            <MotionWrapper>
              <RepairsTable />
            </MotionWrapper>
          }
        />

        {/* Repairs Forms  */}
        <Route
          path="/create/repair"
          element={
            <MotionWrapper>
              <CreateRepair />
            </MotionWrapper>
          }
        />

        {/* Repair Details */}
        <Route
          path="/repair/:id"
          element={
            <MotionWrapper>
              <GetRepairDetailsByID />
            </MotionWrapper>
          }
        />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={Router}></RouterProvider>
    </>
  );
}

export default App;

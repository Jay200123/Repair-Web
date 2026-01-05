import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "@layouts";
import { RepairsTable, CreateRepair, Dashboard } from "@pages";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard/>}/>
        <Route path="/repairs" element={<RepairsTable />} />
        <Route path="/create/repair" element={<CreateRepair />} />
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

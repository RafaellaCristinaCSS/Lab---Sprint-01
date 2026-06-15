import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./presentation/layouts/MainLayout";
import { CreateServiceRequestPage } from "./presentation/pages/CreateServiceRequestPage";
import { DashboardPage } from "./presentation/pages/DashboardPage";
import { ServiceRequestDetailsPage } from "./presentation/pages/ServiceRequestDetailsPage";
import { ServiceRequestsPage } from "./presentation/pages/ServiceRequestsPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="requests" element={<ServiceRequestsPage />} />
        <Route path="requests/new" element={<CreateServiceRequestPage />} />
        <Route path="requests/:id" element={<ServiceRequestDetailsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

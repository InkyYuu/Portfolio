import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/HomePage";
import MaintenancePage from "@/pages/MaintenancePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProtectedProjectRoute from "@/pages/ProtectedProjetRoute";
import LegalNoticePage from "./pages/LegalNoticePage";

const isMaintenance = import.meta.env.VITE_MAINTENANCE_SITE === "true";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {isMaintenance ? (
          <>
            <Route path="/" element={<MaintenancePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route
              path="/maintenance"
              element={<MaintenancePage type="page" />}
            />
            <Route path="/legal-notice" element={<LegalNoticePage />} />
            <Route path="/:projectId" element={<ProtectedProjectRoute />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

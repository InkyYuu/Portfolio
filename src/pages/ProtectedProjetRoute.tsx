import { Navigate, useParams } from "react-router-dom";
import ProjectPage from "@/pages/ProjectPage";
import projectsData from "@/data/projects.json";

const validProjectIds = projectsData.map((p) => p.title);

const ProtectedProjectRoute = () => {
  const { projectId } = useParams();

  const isMaintenance = import.meta.env.VITE_MAINTENANCE_PROJECTS === "true";

  if (!projectId || !validProjectIds.includes(projectId)) {
    return <Navigate to="/404" replace />;
  }

  if (isMaintenance) {
    return <Navigate to="/maintenance" replace />;
  }

  return <ProjectPage />;
};

export default ProtectedProjectRoute;

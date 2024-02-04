import { lazy } from "react";

const Converse = lazy(() => import("../pages/Chat/Converse"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const AddStudent = lazy(() => import("../pages/Students/AddStudent"));
const ViewStudent = lazy(() => import("../Components/Student/ViewStudent"));
const ViewAllStudents = lazy(() => import("../pages/Students/ViewAllStudents"));
const AddClassInsights = lazy(() => import("../Components/Student/AddClassInsights"));
const ImageAnalyzer = lazy(() => import("../pages/Chat/ImageAnalyzer"));
const HandwrittenNotes = lazy(() => import("../pages/Chat/HandwrittenNotes"));

const coreRoutes = [
  {
    path: "/chat/converse",
    title: "Chat with LLM",
    component: Converse,
  },
  {
    path: "/chat/analyse",
    title: "Analyze Images with LLM",
    component: ImageAnalyzer,
  },
  {
    path: "/teacher/profile",
    title: "Add your Profile",
    component: Profile,
  },
  {
    path: "/students/add",
    title: "Add Student",
    component: AddStudent,
  },
  {
    path: "/students/view/:studentId",
    title: "View Student",
    component: ViewStudent,
  },
  {
    path: "/students/manage",
    title: "View All Students",
    component: ViewAllStudents,
  },
  {
    path: "/students/add-insights/:studentId",
    title: "Add Class Insights",
    component: AddClassInsights,
  },
  {
    path: "/chat/handwritten-notes",
    title: "Convert Handwritten Notes",
    component: HandwrittenNotes,
  },
];

const routes = [...coreRoutes];
export default routes;

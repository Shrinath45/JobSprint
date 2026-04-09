import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Saved from "./components/Saved";

// ✅ Layout Wrapper (so Navbar shows everywhere)
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/home",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/jobs",
    element: (
      <Layout>
        <Jobs />
      </Layout>
    ),
  },
  {
    path: "/saved",
    element: (
      <Layout>
        <Saved />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
  },
  {
    path: "/description/:id",
    element: (
      <Layout>
        <JobDescription />
      </Layout>
    ),
  },
  {
    path: "/browse",
    element: (
      <Layout>
        <Browse />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },

  // ✅ ADMIN ROUTES
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Layout>
          <Companies />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <Layout>
          <CompanyCreate />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <Layout>
          <CompanySetup />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <Layout>
          <AdminJobs />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <Layout>
          <PostJob />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Layout>
          <Applicants />
        </Layout>
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
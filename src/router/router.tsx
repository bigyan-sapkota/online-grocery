import ProtectedRoute from "@/components/protected-route";
import DashboardLayout from "@/layouts/dashboard-layout";
import MainLayout from "@/layouts/main-layout";
import AboutUsPage from "@/pages/about-us-page";
import DashboardHomePage from "@/pages/dashboard-home-page";
import DashboardOrdersPage from "@/pages/dashboard-orders-page";
import DashboardProductsPage from "@/pages/dashboard-products-page";
import HomePage from "@/pages/home-page";
import LoginPage from "@/pages/login-page";
import ProductsPage from "@/pages/products-page";
import RegisterPage from "@/pages/register-page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about-us", element: <AboutUsPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHomePage /> },
      { path: "products", element: <DashboardProductsPage /> },
      { path: "orders", element: <DashboardOrdersPage /> },
    ],
  },
]);

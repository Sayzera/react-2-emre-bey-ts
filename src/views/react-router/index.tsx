import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home-page";
import "./style.css";
import HomePage from "./pages/home/home-page";
import AboutPage from "./pages/about/about-page";
import UserPage from "./pages/user/user-page";
import ProductsPage from "./pages/products/products-page";
import Contact from "./pages/contact";
import type { JSX } from "react";
import ProductsIndexPage from "./pages/products/products-index-page";
import Layout from "./layout";
import ProductDetailPage from "./pages/products/product-detail-page";
import ProtectedRoute from "./pages/dashboard/protected-route";
import Dashboard from "./pages/dashboard";
import FormState from "./pages/form-state";
import FormSuccess from "./pages/form-state/form-success";

interface PathListProps {
  path: string;
  component: JSX.Element;
}

const pathList: PathListProps[] = [
  {
    path: "/",
    component: <HomePage />,
  },
  {
    path: "/about",
    component: <AboutPage />,
  },
  {
    path: "/products",
    component: <ProductsPage />,
  },
  {
    path: "/user:id",
    component: <UserPage />,
  },
  {
    path: "/iletisim",
    component: <Contact />,
  },
];

const ReactRouterMain = () => {
  return (
    <BrowserRouter>
      <div className="router-example">
        <nav className="navbar">
          <div className="nav-brand">
            <h2>React Router Örneği</h2>
          </div>

          <div className="nav-links">
            <Link to="/" className="nav-link">
              Ana Sayfa
            </Link>

            {/*TODO: isTransitioning  navlink içerisinde nedir neden kullanırız */}
            <NavLink
              to={"/about"}
              className={(props) => {
                return `nav-link ${props.isActive ? "active" : ""}`;
              }}
            >
              Hakkında
            </NavLink>

            <NavLink
              to={"/iletisim"}
              className={(props) => {
                return `nav-link ${props.isActive ? "active" : ""}`;
              }}
            >
              İletişim
            </NavLink>

            <NavLink
              to={"/urunler"}
              className={(props) => {
                return `nav-link ${props.isActive ? "active" : ""}`;
              }}
            >
              Ürünler
            </NavLink>

            <NavLink
              to={"/dashboard"}
              className={(props) => {
                return `nav-link ${props.isActive ? "active" : ""}`;
              }}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/form"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Form State
            </NavLink>

            <NavLink
              to="/filtered-products"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Filtreleme
            </NavLink>

            <NavLink
              to="/relative-links"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Relative Links
            </NavLink>
          </div>
        </nav>
        <div className="main-content">
          <Routes>
            {/* Basit Route tanımı */}

            {/* {pathList.map((pathItem) => (
              <Route path={pathItem.path} element={pathItem.component} />
            ))} */}

           {/* <Route element={<Layout />}> */}
              <Route path={"/"} element={<HomePage />} />
              <Route path={"/about"} element={<HomePage />} />
            
              <Route path={"/urunler"} element={<ProductsPage />}>
                <Route index element={<ProductsIndexPage />} />
                <Route path=":productId" element={<ProductDetailPage />}/>
              </Route>
              <Route path={"/user/:id"} element={<UserPage />} />
              <Route path={"/iletisim"} element={<Contact />} />

              <Route path={"/form"} element={<FormState />} />
              <Route path={"/form-success"} element={<FormSuccess />} />

              {/* Protected Route */}
              <Route 
                path="/dashboard"
                element={
                  <ProtectedRoute>
                      <Dashboard />
                  </ProtectedRoute>
                }
              />

           {/* </Route> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default ReactRouterMain;

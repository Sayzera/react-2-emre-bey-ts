import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home-page";
import "./style.css";
import HomePage from "./pages/home/home-page";
import AboutPage from "./pages/about/about-page";
import UserPage from "./pages/user/user-page";
import ProductsPage from "./pages/products/products-page";

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
                console.log(props, "props");
                return `nav-link ${props.isActive ? "active" : ""}`;
              }}
            >
              Hakkında
            </NavLink>

            <NavLink
              to={"/iletisim"}
              className={(props) => {
                console.log(props, "props");
                return `nav-link ${props.isActive ? "active" : ""}`;
              }}
            >
              İletişim
            </NavLink>

            <NavLink
              to={"/urunler"}
              className={(props) => {
                console.log(props, "props");
                return `nav-link ${props.isActive ? "active" : ""}`;
              }}
            >
              Ürünler
            </NavLink>

            <NavLink
              to={"/dashboard"}
              className={(props) => {
                console.log(props, "props");
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
        <Routes>
          {/* Basit Route tanımı */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default ReactRouterMain;

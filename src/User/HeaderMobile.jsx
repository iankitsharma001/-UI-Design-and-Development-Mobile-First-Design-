import React from "react";
import { Link } from "react-router-dom";
import { Logout } from "./userapp";

export default function HeaderMobile() {
  return (
    <nav className="navbar  fixed-top d-block d-md-none ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <h1>Myntra</h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 gap-2">
              <li className="nav-item home me-4">
                <Link to="/home" className="fs-5 text-decoration-none ">
                  <i className="fa fa-home"></i> Home
                </Link>
              </li>
              <li className="nav-item cart me-4">
                <Link to="/cart" className="fs-5 text-decoration-none">
                  <i className="fa fa-shopping-cart"></i> Cart
                </Link>
              </li>
              {localStorage.getItem("name") !== null ? (
                <>
                  <li className="nav-item me-2">
                    {" "}
                    <Link
                      to="/orderlist"
                      className="fs-5 text-decoration-none login"
                    >
                      {" "}
                      <i className="fa fa-rectangle-list"></i> Orderlist{" "}
                    </Link>
                  </li>
                  <li className="nav-item mt-4">
                    {" "}
                    <Link
                      onClick={Logout}
                      className="fs-5 text-decoration-none login"
                    >
                      {" "}
                      <i className="fa fa-power-off"></i> Logout
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  {" "}
                  <Link to="/login" className="fs-5 login">
                    {" "}
                    <i className="fa fa-user-plus"></i> Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

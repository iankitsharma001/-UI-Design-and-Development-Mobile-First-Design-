import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Cart from "./cart";
import Login from "./login";
import Signup from "./signup";
import Orderlist from "./orderlist";
import Footer from "./footer";
import HeaderMobile from "./HeaderMobile";

const UserApp = () => {

    return (
        <HashRouter>
            <nav className="navbar navbar-expand-sm  sticky-top d-md-block d-none">
                <div className="container">
                    <h1>iANKiT</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav ms-auto text-white">
                            <li className="nav-item home me-4" >
                                <Link to="/home" className="fs-5 text-decoration-none "><i className="fa fa-home"></i></Link>
                            </li>
                            <li className="nav-item cart me-4">
                                <Link to="/cart" className="fs-5 text-decoration-none"><i className="fa fa-shopping-cart"></i></Link>
                            </li>
                            {localStorage.getItem("name") !== null ? (
                                <>
                                    <li className="nav-item me-2"> <Link to="/orderlist" className="fs-5 text-decoration-none login"> <i className="fa fa-rectangle-list"></i> Orderlist </Link></li>
                                    <li className="nav-item"> <Link onClick={Logout} className="fs-5 text-decoration-none   login"> <i className="fa fa-power-off"></i> Logout</Link></li>
                                </>
                            ) : (
                                <li className="nav-item"> <Link to="/login" className="fs-5 login"> <i className="fa fa-user-plus"></i> Login</Link></li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>

            <HeaderMobile />








            <Routes>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/orderlist" element={<Orderlist />} />
            </Routes>
            <Footer />
        </HashRouter>
    )
}

export default UserApp;

export const Logout = () => {
    localStorage.clear();
    window.location.reload();
}

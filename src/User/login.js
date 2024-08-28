import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
    let [email, pickemail] = useState("");
    let [pass, pickpass] = useState("");

    let [value, pickvalue] = useState("");
    const getdata = async () => {
        let url = "https://cybotrix.com/webapi/login/auth";
        let newbrand = { email: email, password: pass };
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(newbrand)
        }
        await fetch(url, postData)
            .then(response => response.json())
            .then(msg => {
                console.log(msg);
                if (msg) {
                    pickvalue(true);
                    alert("login Successful");
                    localStorage.setItem("name", msg.name);
                    localStorage.setItem("tokenno", msg.tokenno);
                    window.location.href="http://localhost:3000/#/cart";
                    window.location.reload();
                }
            }

            )
    }
    if (value == true) {
        return <Navigate to="/cart" />
    }

    return (
        <div className="container mt-3 mb-4 ">
            <div className="row text-center mt-3">
                <div className="col-12 signup">
                    <div className="card">
                        <div className="card-header bg-range text-white "><h5 className="pt-1"> <i className="fa fa-user"></i> Login</h5></div>
                        <div className="card-body login-div text-start d-flex flex-column gap-3">
                            <div className="form-group">
                                <label>Email Id : </label>
                                <input type="text" className="form-control" onChange={obj => pickemail(obj.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Password : </label>
                                <input type="text" className="form-control" onChange={obj => pickpass(obj.target.value)} />
                            </div>
                            <button className="btn btn-dark me-2 w-100 bg-range" onClick={getdata}>Login</button><Link to="/signup" className="btn btn-dark bg-range"> Signup</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
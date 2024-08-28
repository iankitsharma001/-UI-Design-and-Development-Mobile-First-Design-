import { useState } from "react";

const Signup = () => {
    let [fullname, pickfname] = useState("");
    let [email, pickemail] = useState("");
    let [pass, pickpass] = useState("");
    let [mobile, pickmobile] = useState("");


    return (
        <div className="container mt-3 mb-4">
            <div className="row">
                <div className="col-12 signup">
                    <div className="card">
                        <div className="card-header text-center bg-range text-white">
                            <h4>Signup</h4>
                        </div>
                        <div className="card-body text-start d-flex flex-column gap-3">
                            <div className="form-group">
                                <label>Fullname:</label>
                                <input type="text" className="form-control" onChange={obj => pickfname(obj.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>email:</label>
                                <input type="text" className="form-control" onChange={obj => pickemail(obj.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>pass:</label>
                                <input type="text" className="form-control" onChange={obj => pickpass(obj.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>mobile:</label>
                                <input type="text" className="form-control" onChange={obj => pickmobile(obj.target.value)} />
                            </div>
                            <button className=" text-white btn bg-range">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Signup;
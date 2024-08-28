import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Cart = () => {
    let [cartitems, pickcartitems] = useState([]);
    let [pmode, pickpmode] = useState("");
    const [isLoading, setIsLoading] = useState(false); // New state for managing spinner visibility
    let Subtotal = 0;

    // Spinner component to show while loading
    const Spinner = () => {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    };

    const getitems = async () => {
        setIsLoading(true); // Show spinner before fetching
        let url = "https://cybotrix.com/webapi/cart/getcartitem";
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify({ "orderid": 8576977691 })
        }
        await fetch(url, postData)
            .then(response => response.json())
            .then(msg => {
                pickcartitems(msg);
                setIsLoading(false);
            })
    }

    const mode = (param) => {
        if (pmode === param) {
            pickpmode("");
        }
        pickpmode(param);
        //pmode=param;
    }

    const delitem = async (item) => {
        setIsLoading(true);
        <div class="spinner-border"></div>
        let url = "https://cybotrix.com/webapi/cart/removeCartItem";
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify({ "productid": item.productid, "id": item.id, "qty": item.quantity })
        }
        await fetch(url, postData)
            .then(response => response.text())
            .then(msg => {
                alert(msg);
                getitems();
                setIsLoading(false);
            })
    }

    const addqty = async (item, action) => {
        let qty = 0;
        { action === "add" ? qty += 1 : qty -= 1 };
        if (item.quantity == 1 && action === "sub") {
            delitem(item);
        }
        else {
            let url = "https://cybotrix.com/webapi/cart/addtocart";
            let cartitem = { productid: item.productid, orderid: 8576977691, qty: qty, price: item.priceperunit };
            let postData = {
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                body: JSON.stringify(cartitem)
            }
            await fetch(url, postData)
                .then(response => response.text())
                .then(msg => {
                    alert(msg);
                    getitems();
                })
        }
    }

    let [userid, pickuserid] = useState("");


    const buynow = async () => {
        if (localStorage.getItem("name") != null) {
            setIsLoading(true);
            alert(pmode);
            let url = "https://cybotrix.com/webapi/cart/paynow";
            let orderData = { mode: pmode, orderid: 8576977691, userid: localStorage.getItem("tokenno"), total: Subtotal };
            let postData = {
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                body: JSON.stringify(orderData)
            }
            await fetch(url, postData)
                .then(response => response.text())
                .then(msg => {
                    alert(msg);
                })
        }
        else {
            pickuserid("false");
        }
    }



    useEffect(() => {
        getitems();
    }, [])

    if (isLoading) {
        // Render spinner if loading
        return <Spinner />;
    }

    if (userid === "false") {
        return (
            <Navigate to="/login" />
        )
    }

    return (
        <div>
            <div className="container pt-3">
                <h2 className="text-center">Items in Cart - {cartitems.length}</h2>
                <div className="row mt-3 m-auto mt-3">
                    {
                        cartitems.map((item, index) => {
                            { Subtotal += parseInt(item.total) }
                            return (
                                <div key={index} className="border col-12 p-4  mt-2">
                                    <div className="row flex-wrap">
                                        <div className="col-lg-2 col-12">
                                            <img src="pic.jpg" height={100} width={100} />
                                        </div>
                                        <div className="col-lg-7 col-12">
                                            <div className="price-detail gap-2">
                                                <h3>{item.productname}</h3>
                                                <h6>Product Id - {item.productid}</h6>
                                                <label>Orderid - {item.orderid}</label>
                                                <div className="row mt-2">
                                                    <label className="col-xl-4 incre-decre"><button className="btn btn-sm bg-range text-white" onClick={addqty.bind(this, item, "sub")}>-</button> {item.quantity} <button onClick={addqty.bind(this, item, "add")} className="btn bg-range btn-sm text-white">+</button></label>
                                                    <label className="col-xl-4 text-danger"><button className=" btn " onClick={delitem.bind(this, item)}>Delete</button></label>
                                                    <label className="text-end col-xl-4">Total - {item.total}</label><br />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-12">
                                            <h4><i class="fa-solid fa-indian-rupee-sign"></i> {item.priceperunit}</h4>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
                <div className="text-end col-12 mb-4 mt-3">
                    {(cartitems.length > 0) ? (
                        <>
                            <h5> Subtotal ({cartitems.length} items) : <i class="fa-solid fa-indian-rupee-sign"></i> {Subtotal} </h5>
                            <button className="btn bg-range text-white"
                                data-bs-toggle="modal"
                                data-bs-target={(cartitems.length > 0) ? "#myModal" : ""}>
                                Buy Now
                            </button>
                        </>
                    ) :
                        <>

                            <h1 className="mt-5">Your Cartlist is Empty <i className="fa fa-shopping-bag fs-1 text-danger"></i>
                            </h1>
                            <h3>Add some items to the cart</h3>
                        </>
                    }

                </div>
            </div>


            <div class="modal fade" id="myModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 className="ms-auto">Choose Payment Mode</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">
                            <div className="row">
                                <h5 class="modal-title col-xl-9">You are paying for 1 Order Request    </h5>
                                <h5 className="text-end col-xl-3">{Subtotal}</h5>
                            </div>
                            <div className="row bg-secondary ">
                                <h5 class="modal-title col-xl-9">TOTAL AMOUNT TO BE PAID    </h5>
                                <h5 className="text-end col-xl-3">{Subtotal}</h5>
                            </div>
                            <h6><i className="fa fa-coins"></i> PAY VIA MY BALANCE</h6>
                            <hr />
                            <label>My Balance: INR 12345</label><br />
                            <hr />
                            <h5>PAYMENT METHOD</h5>
                            <div className="row">
                                <div className="col-2 border m-auto text-center paymodes" onClick={mode.bind(this, "UPI")}>
                                    <i className="fa-brands fa-google-pay"  ></i><br />
                                    UPI
                                </div>
                                <div className="col-2 border m-auto text-center paymodes" onClick={mode.bind(this, "Visa")} >
                                    <i className="fa-brands fa-cc-visa"   ></i><br />
                                    Visa
                                </div>
                                <div className="col-2 border m-auto text-center paymodes" onClick={mode.bind(this, "Wallet")}>
                                    <i className="fa fa-wallet"></i><br />
                                    Wallet
                                </div>
                                <div className="col-2 border m-auto text-center paymodes" onClick={mode.bind(this, "Credit Card")}>
                                    <i className="fa fa-credit-card"   ></i><br />
                                    Credit Card
                                </div>
                                <div className="col-2 border m-auto text-center paymodes" onClick={mode.bind(this, "Cheque")}>
                                    <i className="fa fa-money-check" ></i><br />
                                    Cheque
                                </div>
                                <div className="col-2 border m-auto text-center paymodes" onClick={mode.bind(this, "Debit Card")}>
                                    <i className="fa-regular fa-credit-card" ></i><br />
                                    Debit Card
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" disabled={!pmode} class="btn btn-dark" data-bs-dismiss="modal" onClick={buynow}>Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div class="modal" id="myModal">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Modal Heading</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
        </div> */}

        </div>

    )
}

export default Cart;

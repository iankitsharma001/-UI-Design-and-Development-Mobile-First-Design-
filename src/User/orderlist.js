import { useEffect, useState } from "react";

const Orderlist=()=>
{
    let[totalorders,picktotalorders]=useState([]);
    let id=localStorage.getItem("tokenno");

    const getdata=async()=>
    {
        let url="https://cybotrix.com/webapi/cart/myorder";
        let postData={
            headers:{'Content-Type':'application/json'},
            method:'post',
            body:JSON.stringify({userid:id})
        }
        await fetch(url,postData)
        .then(response=>response.json())
        .then(orders=>
        {
            picktotalorders(orders.reverse());
            console.log(totalorders);
        })
    }

    useEffect(()=>
    {
        getdata();
    },[]);

    return(
        <div className="container">
            <h1 className="text-center">Total Orders - {totalorders.length}</h1>
            {
                totalorders.map((orders,index)=>
                {
                    return(
                        <table className="table table-bordered">
                        <h5 className="text-center">Number of Items in this order -{orders.length}</h5>
                        <table className="table">
                        <tr>
                            <th>Id </th>
                            <th>Order Id</th>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Price </th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Payment Mode</th>
                            <th>Payment Status</th>
                        </tr>
                        {
                            orders.map((order,index)=>
                            { 
                                return(
                                    <tr>
                                        <td>{order.id}</td>
                                        <td>{order.orderid}</td>
                                        <td>{order.productid}</td>
                                        <td>{order.productname}</td>
                                        <td>{order.priceperunit}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.total}</td>
                                        <td>{order.mode}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                )
                            })
                        }

                        </table>
                        </table>
                    )
                })
            }
               
        </div>
    )


}

export default Orderlist;
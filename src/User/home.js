import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
const Home = () => {
    let [allbrand, pickbrand] = useState([]);
    let [allcategory, pickcategory] = useState([]);
    let [allproduct, pickproduct] = useState([]);

    let [search, picksearch] = useState("");

    let [bname, pickbname] = useState("");
    let [cname, pickcname] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const Spinner = () => {
        return (
            <div>
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <i class="fa fa-spinner fa-spin fs-1"></i>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }


    const searchproduct = async () => {
        setIsLoading(true);
        let url = "https://cybotrix.com/webapi/product/searchproduct";
        let newcat = { categoryid: cname, brandid: bname }; // pass productid
        let postdata = {
            headers: { 'content-type': 'application/json' },
            method: "post",
            body: JSON.stringify(newcat)
        }
        await fetch(url, postdata)
            .then(response => response.json())
            .then(msg => {
                pickproduct(msg);
                setIsLoading(false);
            })
    }

    const getbrand = async () => {
        setIsLoading(true);
        let url = "https://cybotrix.com/webapi/brand/getall";
        await fetch(url)
            .then(response => response.json())
            .then(array => {
                pickbrand(array);
                setIsLoading(false);
            })
    }

    const getcategory = async () => {
        setIsLoading(true);
        let url = "https://cybotrix.com/webapi/category/getall";
        await fetch(url)
            .then(response => response.json())
            .then(array => {
                pickcategory(array);
                setIsLoading(false);
            })
    }

    const getproduct = async () => {
        await fetch("https://cybotrix.com/webapi/product/getall")
            .then(response => response.json())
            .then(array => {
                pickproduct(array);
            })
    }

    const addToCart = async (id, price) => {
        let url = "https://cybotrix.com/webapi/cart/addtocart";
        let cartitem = { productid: id, orderid: 8576977691, qty: 1, price: price }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(cartitem)
        }
        await fetch(url, postData)
            .then(response => response.text())
            .then(msg => {
                alert(msg);
            })
    }

    const PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    useEffect(() => {
        getbrand();
        getcategory();
        getproduct();
    }, [])
    useEffect(() => {
        searchproduct();
    }, [cname, bname])
    const onSearch=(serchTerm)=>{
        picksearch(serchTerm)
        alert(serchTerm);
    }




    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-xl-4"></div>
                <div className="col-xl-4"><input type="text" onChange={obj => picksearch(obj.target.value)}
                 placeholder="Search..." className="form-control" /></div>
            <div className="drop-down border-rounded shadow p-1">
        {
                allproduct.filter((item, index)=>{



                const searchTerm = search.toLowerCase();
                const pname=item.productname.toLowerCase();
                return searchTerm && pname.startsWith(searchTerm) && pname!==searchTerm;
                })
                .map((item)=><div id="drop" onClick={()=>onSearch(item.productname)}
                className="dropdown-row search_drop_down" style={{cursor:"pointer"}}>



                {item.productname}
            </div>)
                }
                </div>
                </div>
            <div className="row mt-4 bg-orange filter-new">
                <div className="col-12 col-md-3">
                    <div className="row mt-4 filter">
                        <h3 className=" col-xl-12 text-dark pt-3 pb-3"> Select brand </h3>
                        {
                            allbrand.map((brand, index) => {
                                return (
                                    // <h6 className="mb-3"> <input type="radio" name="brand" className="me-2" value={brand.brandid} onChange={obj => pickbname(obj.target.checked ? brand.brandid : null)} /> {brand.brandname} </h6>
                                    <h6 className="mb-3 brand">
                                        <label>
                                            <input type="radio" name="category" className="me-2 visually-hidden" value={brand.brandid} onChange={obj => pickcname(obj.target.checked ? brand.brandid : null)} />
                                            <span className="arrow-icon">
                                                <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.4543 9.88345C22.6887 9.64904 22.8203 9.33115 22.8203 8.9997C22.8203 8.66824 22.6887 8.35036 22.4543 8.11595L15.3831 1.0447C15.2678 0.925308 15.1298 0.83008 14.9773 0.764569C14.8248 0.699058 14.6608 0.664575 14.4948 0.663133C14.3289 0.66169 14.1643 0.693318 14.0106 0.756169C13.857 0.81902 13.7175 0.911837 13.6001 1.0292C13.4827 1.14657 13.3899 1.28613 13.3271 1.43975C13.2642 1.59337 13.2326 1.75797 13.234 1.92395C13.2355 2.08992 13.2699 2.25395 13.3355 2.40645C13.401 2.55896 13.4962 2.69689 13.6156 2.8122L18.5531 7.7497L1.99933 7.7497C1.66781 7.7497 1.34987 7.88139 1.11545 8.11581C0.881025 8.35023 0.74933 8.66817 0.74933 8.99969C0.74933 9.33122 0.881025 9.64916 1.11545 9.88358C1.34987 10.118 1.66781 10.2497 1.99933 10.2497L18.5531 10.2497L13.6156 15.1872C13.3879 15.423 13.2619 15.7387 13.2647 16.0664C13.2676 16.3942 13.399 16.7077 13.6308 16.9395C13.8626 17.1712 14.1761 17.3027 14.5038 17.3055C14.8316 17.3084 15.1473 17.1824 15.3831 16.9547L22.4543 9.88345Z" fill="#F85934"></path>
                                                </svg>
                                            </span>
                                            {brand.brandname}
                                        </label>
                                    </h6>


                                )
                            })
                        }
                    </div>


                    <div className="row mt-4 filter">
                        <h3 className=" col-xl-12 text-dark pt-3 pb-3"> Select category </h3>
                        {
                            allcategory.map((category, index) => {
                                return (
                                    // <h6 className="mb-3"> <input type="radio" name="category" className="me-2" value={category.catid} onChange={obj => pickcname(obj.target.checked ? category.catid : null)} /> {category.categoryname} </h6>
                                    <h6 className="mb-3 category">
                                        <label>
                                            <input type="radio" name="category" className="me-2 visually-hidden" value={category.catid} onChange={obj => pickcname(obj.target.checked ? category.catid : null)} />
                                            <span className="arrow-icon">
                                                <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.4543 9.88345C22.6887 9.64904 22.8203 9.33115 22.8203 8.9997C22.8203 8.66824 22.6887 8.35036 22.4543 8.11595L15.3831 1.0447C15.2678 0.925308 15.1298 0.83008 14.9773 0.764569C14.8248 0.699058 14.6608 0.664575 14.4948 0.663133C14.3289 0.66169 14.1643 0.693318 14.0106 0.756169C13.857 0.81902 13.7175 0.911837 13.6001 1.0292C13.4827 1.14657 13.3899 1.28613 13.3271 1.43975C13.2642 1.59337 13.2326 1.75797 13.234 1.92395C13.2355 2.08992 13.2699 2.25395 13.3355 2.40645C13.401 2.55896 13.4962 2.69689 13.6156 2.8122L18.5531 7.7497L1.99933 7.7497C1.66781 7.7497 1.34987 7.88139 1.11545 8.11581C0.881025 8.35023 0.74933 8.66817 0.74933 8.99969C0.74933 9.33122 0.881025 9.64916 1.11545 9.88358C1.34987 10.118 1.66781 10.2497 1.99933 10.2497L18.5531 10.2497L13.6156 15.1872C13.3879 15.423 13.2619 15.7387 13.2647 16.0664C13.2676 16.3942 13.399 16.7077 13.6308 16.9395C13.8626 17.1712 14.1761 17.3027 14.5038 17.3055C14.8316 17.3084 15.1473 17.1824 15.3831 16.9547L22.4543 9.88345Z" fill="#F85934"></path>
                                                </svg>
                                            </span>
                                            {category.categoryname}
                                        </label>
                                    </h6>

                                )
                            })
                        }
                    </div>
                </div>


                <div className="col-md-8 col-12 ms-auto me-auto products">
                    {(isLoading) ?
                        (
                            <div>
                                <div className="d-flex justify-content-center align-items-center vh-100">
                                    <i class="fa fa-spinner fa-spin fs-1"></i>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (

                            <div className="row h-100 flex-wrap">
                                {
                                    allproduct.slice(offset, offset + PER_PAGE).map((product, index) => {
                                        if (product.productname.toLowerCase().match(search.toLowerCase()))
                                            return (
                                                <div className="col-lg-3 col-6" key={index}>
                                                    <div className="m-auto product-items">
                                                        <img src="pic.jpg" className="w-100" alt="" />

                                                        <div className="product-item-info">
                                                            <h5>{product.productname}</h5>
                                                            <p>{product.productid}</p>
                                                            <button className="btn" onClick={addToCart.bind(this, product.productid, product.price)}>Add to Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                    })
                                }
                            </div>
                        )}
                </div>
            </div>


            <div className="mb-4 mt-4">
                <ReactPaginate bg-dark
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination  justify-content-center"}
                    pageClassName={"page-item "}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
            </div>
        </div>
    )
}

export default Home;

import '../OrderManager/OrderManager.scss'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function OrderManager() {
    const [orderManage, setOrderManage] = useState([]);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const account = useSelector(state => state.account);
    console.log(orderManage);
    useEffect(() => {
        const fetchAllOrders = async () => {
            let allOrders = [];
            let page = 1;

            while (true) {
                const response = await axios.get(`/api/order/getAll?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${account?.accessToken}`
                    }
                });

                if (response.data.data.length === 0) {
                    break; // Hết dữ liệu
                }

                allOrders = allOrders.concat(response.data.data);
                page++;
            }

            setOrderManage(allOrders);
        };

        fetchAllOrders();
    }, []);


    const openProductModal = (products) => {
        setSelectedProduct(products);
        setOpenModalDetail(true);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orderManage.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(orderManage.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className='categoryManager'>
            <div className="listCate">
                <div className="listCateHeader">
                    <input
                        type="text"
                        className="inputSearchCate"
                        placeholder="Search Order"
                    />
                </div>
                <div className="tableCate">
                    <div className="tableHeader">
                        <div className="nameHeader">
                            <span>Name</span>
                        </div>
                        <div className="phoneHeader">
                            <span>Phone</span>
                        </div>
                        <div className="addressHeader">
                            <span>Address</span>
                        </div>
                        <div className="productHeader">
                            <span>Product</span>
                        </div>
                        <div className="quantityHeader">
                            <span>Quantity</span>
                        </div>
                        <div className="quantityHeader">
                            <span>TotalPrice</span>
                        </div>
                        <div className="createAtheader">
                            <span>Time</span>
                        </div>
                        <div className="statusHeader">
                            <span>Status</span>
                        </div>
                        <div className="reasonHeader">
                            <span>Reason</span>
                        </div>

                    </div>
                    <div className="tableBody">
                        {currentItems.map((o, index) => (
                            <div className="rowBody" key={index}>
                                <div className="nameBody">
                                    <span>{o.addressShippingId.customerName}</span>
                                </div>
                                <div className="phoneBody">
                                    <span>{o.addressShippingId.phone}</span>
                                </div>
                                <div className="addressBody">
                                    <span>{o.addressShippingId.address}</span>
                                </div>
                                <div className="productBody">
                                    <div className="representativeImage">
                                        <img src={o.cart[0].image} alt="" />
                                        <div className="middle">
                                            <div className="text" onClick={() => openProductModal(o.cart)}>
                                                View
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quantityBody">
                                    <span>{o.cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                                </div>
                                <div className="priceBody">
                                    <span>{o.totalPrice.toLocaleString('en-US')} vnd</span>
                                </div>
                                <div className="createAtBody">
                                    <span>{new Date(o.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="statusBody">
                                    <span>
                                        {o.isCancel ? "Cancelled" : o.isDeliverySuccess ? "Delivered" : "Pending"}
                                    </span>
                                </div>
                                <div className="reasonBody">
                                    {o.isCancel ? (
                                        <span>{o.reasonCancel}</span>
                                    ) : (
                                        <span>N/A</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedProduct && (
                        <div className="modalDetail">
                            <div className={`modalShowDetail${openModalDetail ? " show" : ""}`}>
                                <div className="titleCloseBtn">
                                    <button
                                        onClick={() => {
                                            setOpenModalDetail(false);
                                            setSelectedProduct(null);
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className="title">
                                    <h1>Detail</h1>
                                </div>
                                <div className="body">
                                    <div className="tableProduct">
                                        <div className="tableProductHeader">
                                            <div className="IdProduct">
                                                <span>STT</span>
                                            </div>
                                            <div className="imgProduct">
                                                <span>Image</span>
                                            </div>
                                            <div className="nameProduct">
                                                <span>Name</span>
                                            </div>
                                            <div className="quantityProduct">
                                                <span>Quantity</span>
                                            </div>
                                            <div className="priceProduct">
                                                <span>Price</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tableBodyProduct">
                                        {selectedProduct.map((product, index) => (
                                            <div className="rowBodyProduct" key={index}>
                                                <div className="productId">
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className="productImg">
                                                    <img src={product.image} alt={product.name} />
                                                </div>
                                                <div className="productName">
                                                    <span>{product.name}</span>
                                                </div>
                                                <div className="productQuantity">
                                                    <span>{product.quantity}</span>
                                                </div>
                                                <div className="productPrice">
                                                    <span>{product.totalPrice.toLocaleString('en-US')} vnd</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="pagination">
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={number === currentPage ? "active" : ""}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OrderManager;
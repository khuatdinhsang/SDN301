import React, { useState } from 'react';
import './Shipper.scss'; // Import CSS file

const ShipperTable = () => {
  const [searchText, setSearchText] = useState(''); // State for search text
  const [searchProduct, setSearchProduct] = useState(''); // State for product search
  const [searchStatus, setSearchStatus] = useState(''); // State for status search

  const orders = [
    {
      Order: 1,
      Title: 'Order 1',
      Product: 'Product 1',
      Customer: 'Customer 1',
      Cost: 100,
      LastActivity: '2023-10-27',
      Status: 'Pending',
      Reason: 'Out of stock',
    },
    {
      Order: 2,
      Title: 'Order 2',
      Product: 'Product 2',
      Customer: 'Customer 2',
      Cost: 200,
      LastActivity: '2023-10-28',
      Status: 'Delivered',
      Reason: '',
    },
    {
      Order: 3,
      Title: 'Order 3',
      Product: 'Product 3',
      Customer: 'Customer 3',
      Cost: 150,
      LastActivity: '2023-10-29',
      Status: 'Cancelled',
      Reason: 'Customer request',
    },
    {
      Order: 4,
      Title: 'Order 4',
      Product: 'Product 4',
      Customer: 'Customer 4',
      Cost: 180,
      LastActivity: '2023-10-30',
      Status: 'Shipped',
      Reason: '',
    },
    // Add more orders as needed
  ];

  return (
    <div className="container-fluid shipper-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-icon">
          <a href="#">Home</a><br></br>
          <a href="#">Chat</a>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        {/* Search Bar */}
        <div className='Search'>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button>Search</button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Product"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <button>Search</button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Status"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
          />
          <button>Search</button>
        </div>
        </div>
       

        {/* Table */}
        <table className="table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Title</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Cost</th>
              <th>Last Activity</th>
              <th>Status</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter(
                (order) =>
                  order.Title.toLowerCase().includes(searchText.toLowerCase()) &&
                  order.Product.toLowerCase().includes(searchProduct.toLowerCase()) &&
                  order.Status.toLowerCase().includes(searchStatus.toLowerCase())
              )
              .map((order) => (
                <tr key={order.Order}>
                  <td>{order.Order}</td>
                  <td>{order.Title}</td>
                  <td>{order.Product}</td>
                  <td>{order.Customer}</td>
                  <td>{order.Cost}</td>
                  <td>{order.LastActivity}</td>
                  <td>{order.Status}</td>
                  <td>{order.Reason}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipperTable;
